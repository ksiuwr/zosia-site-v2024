import json
from django.contrib import messages
from django.contrib.admin.views.decorators import staff_member_required
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.shortcuts import get_object_or_404, redirect, render, reverse
from django.utils.html import escape
from django.utils.translation import gettext_lazy as _
from django.views.decorators.http import require_http_methods

from .templates import AddLecture, AdminLecturesList, AdminLecturesUpdate, AdminScheduleUpdate, Lectures, Schedule as ScheduleTemplate
from server.conferences.models import Zosia
from .forms import LectureAdminForm, LectureForm, ScheduleForm
from .models import Lecture, Schedule
from server.utils.forms import errors_format, get_durations


@require_http_methods(['GET'])
def index(request):
    """
    Display all accepted lectures
    """
    zosia = Zosia.objects.find_active()
    lectures = Lecture.objects.select_related('author').prefetch_related('supporting_authors') \
        .filter(zosia=zosia, accepted=True)

    authors_names_with_lecture_id = map(
        lambda lecture: {'lecture_id': lecture.id, 'authors_names': lecture.all_authors_names}, lectures
    )

    return Lectures(lectures=lectures, all_authors_names=authors_names_with_lecture_id).render(request)


@staff_member_required()
@require_http_methods(['GET'])
def display_all_staff(request):
    """
    Display all for staff members, they can change acceptation status
    """
    zosia = Zosia.objects.find_active()
    lectures = Lecture.objects.select_related('author').prefetch_related('supporting_authors') \
        .filter(zosia=zosia)
    return AdminLecturesList(lectures=lectures).render(request)


@staff_member_required()
@require_http_methods(['POST'])
def toggle_accept(request):
    """
    ajax for accepting lecture
    """
    lecture_id = request.POST.get('key', None)
    lecture = get_object_or_404(Lecture, pk=lecture_id)
    lecture.toggle_accepted()
    return JsonResponse({'msg': "Lecture \"{}\" changed status!".format(escape(lecture.title)), "isAccepted": lecture.accepted})


@login_required()
def lecture_add(request):
    """
    participant can add his own lecture
    """
    try:
        zosia = Zosia.objects.get(active=True)
    except Zosia.DoesNotExist:
        messages.error(request, _('There is no active conference'))
        return redirect(reverse('accounts_profile'))

    if not zosia.is_lectures_open:
        messages.error(request, _("Call for paper is not open right now!"))
        return redirect(reverse('accounts_profile'))

    form = LectureForm(request.POST or None)

    if request.method == 'POST':
        if form.is_valid():
            lecture = form.save(commit=False)
            lecture.zosia = zosia
            lecture.author = request.user
            lecture.save()
            messages.success(
                request,
                _("Lecture has been saved, it'll be displayed after it's accepted by organizers.")
            )
            return redirect('lectures_index')
        else:
            messages.error(request, errors_format(form))

    return AddLecture(form=form).render(request)


@staff_member_required()
def lecture_update(request, lecture_id=None):
    """
    Staff member can add lecture for other user, can edit all lectures
    """
    zosia = Zosia.objects.find_active()
    kwargs = {}
    lecture = None

    if lecture_id:
        lecture = get_object_or_404(Lecture, pk=lecture_id)
        kwargs['instance'] = lecture

    form = LectureAdminForm(request.POST or None, **kwargs)

    if request.method == 'POST':
        if form.is_valid():
            lecture = form.save(commit=False)
            lecture.zosia = zosia
            lecture.save()
            form.save_m2m()
            messages.success(request, _("Lecture has been saved."))
            return redirect('lectures_all_staff')
        else:
            messages.error(request, errors_format(form))

    return AdminLecturesUpdate(form=form, editing_existing_lecture=lecture is not None).render(request)


def schedule_display(request):
    zosia = Zosia.objects.find_active()
    try:
        schedule = Schedule.objects.get(zosia=zosia)
        return ScheduleTemplate(schedule_json_data=json.dumps(schedule.schedule_data)).render(request)
    except Schedule.DoesNotExist:
        messages.warning(request, _("Schedule is not defined yet."))
        return redirect('lectures_index')


@staff_member_required()
def schedule_update(request):
    zosia = Zosia.objects.find_active()
    schedule, _ = Schedule.objects.get_or_create(zosia=zosia)
    form = ScheduleForm(request.POST or None, instance=schedule)

    if request.method == 'POST':
        if form.is_valid():
            form.save()
            return redirect('lectures_schedule')

    return AdminScheduleUpdate(form=form).render(request)


def load_durations(request):
    lecture_type = request.GET.get("lecture_type")
    durations = {'durations': [d[0] for d in get_durations(lecture_type, request.user)]}
    return JsonResponse(durations)
