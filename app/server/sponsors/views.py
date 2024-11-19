from django.contrib import messages
from django.contrib.admin.views.decorators import staff_member_required
from django.http import JsonResponse
from django.shortcuts import get_object_or_404, redirect, render, reverse
from django.utils.html import escape
from django.utils.translation import gettext_lazy as _
from django.views.decorators.http import require_http_methods

from .templates import AdminSponsorsList, AdminSponsorsUpdate
from .forms import SponsorForm
from .models import Sponsor
from server.utils.constants import BUCKET_NAME, BUCKET_URL
from server.utils.forms import errors_format
from server.utils.s3 import list_bucket_objects


@staff_member_required()
@require_http_methods(['GET'])
def index(request):
    return AdminSponsorsList(sponsors=Sponsor.objects.all()).render(request)


@staff_member_required()
@require_http_methods(['POST', 'GET'])
def update(request, sponsor_id=None):
    kwargs = {}
    editing_existing_sponsor = False

    if sponsor_id is not None:
        sponsor = get_object_or_404(Sponsor, pk=sponsor_id)
        editing_existing_sponsor = True
        kwargs['instance'] = sponsor

    form = SponsorForm(request.POST or None, request.FILES or None, **kwargs)

    # TODO: Allow uploading images to Google Cloud Storage bucket
    # ctx['s3_objects'] = list_bucket_objects(BUCKET_NAME)
    # ctx['bucket_url'] = BUCKET_URL

    if request.method == 'POST':
        if form.is_valid():
            form.save()
            messages.success(request, _("Form saved!"))
            return redirect(reverse('sponsors_index'))
        else:
            messages.error(request, errors_format(form))

    return AdminSponsorsUpdate(form=form, editing_existing_sponsor=editing_existing_sponsor).render(request)


@staff_member_required()
@require_http_methods(['POST'])
def toggle_active(request):
    sponsor_id = request.POST.get('key', None)
    sponsor = get_object_or_404(Sponsor, pk=sponsor_id)
    sponsor.toggle_active()
    sponsor.save()
    return JsonResponse({'msg': "{} changed status!".format(escape(sponsor.name)), 'isActive': sponsor.is_active})
