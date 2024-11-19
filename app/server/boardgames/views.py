import json
import re

from django.urls import reverse
from django.views.decorators.http import require_http_methods
from django.contrib.auth.decorators import login_required
from django.contrib.admin.views.decorators import staff_member_required
from django.shortcuts import get_object_or_404, redirect, render
from django.contrib import messages
from django.utils.translation import gettext_lazy as _
from django.utils.html import escape
from django.http import JsonResponse, HttpResponseBadRequest
from django.db.models import Count
from urllib.request import urlopen

from .templates import AdminBoardgamesAccept, BoardgamesAdd, BoardgamesHome, BoardgamesMyGames, BoardgamesVote
from .models import Boardgame, Vote
from .forms import BoardgameForm
from server.conferences.models import Zosia
from server.users.models import UserPreferences


MAX_NUMBER_OF_GAMES = 3


@login_required
@require_http_methods(['GET'])
def index(request):
    boardgames = Boardgame.objects.all().annotate(
        votes=Count('boardgame_votes')).order_by('-votes', 'name')
    votes = [{"name": name, "votes": num_votes} for name, num_votes in boardgames.values_list('name', 'votes')]

    try:
        current_zosia = Zosia.objects.get(active=True)
    except Zosia.DoesNotExist:
        messages.error(request, _('There is no active conference'))
        return redirect(reverse('accounts_profile'))

    try:
        preferences = UserPreferences.objects.get(
            zosia=current_zosia, user=request.user)
    except (UserPreferences.DoesNotExist):
        paid = False
    else:
        paid = preferences.payment_accepted

    return BoardgamesHome(boardgames=boardgames, votes=votes, paid=paid).render(request)


@login_required
@require_http_methods(['GET', 'POST'])
def my_boardgames(request):
    user_boardgames = Boardgame.objects.filter(user=request.user).annotate(
        votes=Count('boardgame_votes')).order_by('-votes', 'name')
    votes = [{"name": name, "votes": num_votes} for name, num_votes in user_boardgames.values_list('name', 'votes')]
    can_add = user_boardgames.count() < MAX_NUMBER_OF_GAMES

    return BoardgamesMyGames(user_boardgames=user_boardgames, votes=votes, can_add=can_add).render(request)


def validate_game_url(url: str) -> bool:
    url_pattern = r'(https://)?boardgamegeek.com/boardgame/\d{1,6}(/[0-9a-z-]+)?'
    if re.match(url_pattern, url) is None:
        return False

    if not url.startswith("https://"):
        url = f"https://{url}"

    # Game name should be different then BoardGameGeek
    return get_game_name(url) != "BoardGameGeek"


# TODO: Simplify title detection
def get_game_name(url) -> str:
    boargamegeek_html = urlopen(url).read()
    title_str = '<title>'
    encoding = "utf-8"
    title_bytes = bytearray(title_str, encoding)
    start_index = boargamegeek_html.find(title_bytes)
    start_index += len(title_str)
    end_index = boargamegeek_html.find(
        bytearray(' |', encoding), start_index)
    name_bytes = boargamegeek_html[start_index: end_index]
    name_str = name_bytes.decode(encoding)
    return name_str


def get_id(url):
    match = re.search(r'(boardgame\/)([0-9]+)', url)
    return match.group(2)


@login_required
@require_http_methods(['GET', 'POST'])
def create(request):
    user_boardgames = Boardgame.objects.filter(user=request.user)
    form = BoardgameForm(request.POST or None)

    if request.method == 'POST':
        if user_boardgames.count() >= MAX_NUMBER_OF_GAMES:
            messages.error(request, _(f"Number of boardgames per account exceeded (max: {MAX_NUMBER_OF_GAMES})."))
        elif form.is_valid():
            new_url = form.cleaned_data['url']
            if not validate_game_url(new_url):
                messages.error(request, _("This is not a valid boardgame url"))
            else:
                game_id = get_id(new_url)
                # TODO: We should save only game id in the model instead of full URL
                url_part = 'boardgame/' + game_id
                if Boardgame.objects.filter(url__contains=url_part).exists():
                    messages.error(
                        request, _("This boardgame has been already added"))
                else:
                    name = get_game_name(new_url)
                    boardgame = Boardgame(
                        name=name, user=request.user, url=new_url)
                    boardgame.save()
                    return redirect('my_boardgames')
        else:
            messages.error(request, _("Can't add boardgame - form is not valid."))

    return BoardgamesAdd(form=form).render(request)


@login_required
@require_http_methods(['GET'])
def vote(request):
    votes = Vote.objects.filter(user=request.user).values_list('boardgame', flat=True)
    boardgames = Boardgame.objects.all().order_by('name')

    return BoardgamesVote(boardgames=boardgames, boardgame_ids_vote_for=list(votes)).render(request)


@login_required
@require_http_methods(['POST'])
def vote_edit(request):
    current_zosia = Zosia.objects.find_active()
    preferences = UserPreferences.objects.get(
        zosia=current_zosia, user=request.user)

    if not preferences.payment_accepted:
        return HttpResponseBadRequest(
            '<h1>Bad request(400)</h1>'
            'To vote for boardgames your payment must be accepted first',
            content_type='text/html'
        )

    new_ids = json.loads(request.POST.get('new_ids'))

    if len(new_ids) > MAX_NUMBER_OF_GAMES:
        return HttpResponseBadRequest(
            '<h1>Bad request(400)</h1>'
            'Everyone can vote only for up to three boardgames',
            content_type='text/html'
        )

    boardgames = Boardgame.objects.filter(pk__in=new_ids)

    newVotes = list()
    for boardgame in boardgames:
        newVotes.append(Vote(user=request.user, boardgame=boardgame))

    Vote.objects.filter(user=request.user).delete()
    Vote.objects.bulk_create(newVotes)

    if (len(new_ids) == 0):
        messages.success(request, "Votes were successfully reset.")
    else:
        games_voted_for = ', '.join(
            map(lambda boardgame: '<strong>"' + boardgame.name + '"</strong>', list(boardgames))
        )
        messages.success(request, "Voted for boardgames: {}.".format(games_voted_for))

    return redirect(reverse('boardgames_index'))


@staff_member_required
@require_http_methods(['GET'])
def accept(request):
    boardgames = Boardgame.objects.all()
    boardgames = sorted(boardgames, key=lambda x: x.accepted, reverse=True)
    return AdminBoardgamesAccept(boardgames=boardgames).render(request)


@staff_member_required
@require_http_methods(['POST'])
def toggle_accepted(request):
    boardgame_id = request.POST.get('key')
    boardgame = get_object_or_404(Boardgame, pk=boardgame_id)
    boardgame.toggle_accepted()

    return JsonResponse({'msg': "Boardgame \"{}\" changed status!".format(escape(boardgame.name)), "isAccepted": boardgame.accepted})


@login_required
@require_http_methods(['POST'])
def boardgame_delete(request):
    boardgame_id = request.POST.get('boardgame_id')
    boardgame = get_object_or_404(Boardgame, pk=boardgame_id)

    if boardgame.user != request.user:
        return HttpResponseBadRequest(
            '<h1>Bad request(400)</h1>'
            "You cannot remove someone else's board game",
            content_type='text/html'
        )

    boardgame.delete()

    messages.success(request, "Deleted boardgame: {}".format(escape(boardgame)))
    return redirect(reverse('my_boardgames'))
