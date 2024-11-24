from django.contrib import messages
from django.contrib.admin.views.decorators import staff_member_required
from django.shortcuts import get_object_or_404, redirect, reverse
from django.utils.translation import gettext_lazy as _
from django.views.decorators.http import require_http_methods

from .templates import AdminOrganizersList, AdminOrganizersUpdate
from .forms import OrganizerForm
from .models import OrganizerContact
from server.utils.forms import errors_format


@staff_member_required()
@require_http_methods(['GET'])
def index(request):
    return AdminOrganizersList(organizers=OrganizerContact.objects.all()).render(request)


@staff_member_required()
@require_http_methods(['POST', 'GET'])
def update(request, contact_id=None):
    kwargs = {}
    organizer_name = ''

    if contact_id is not None:
        organizer = get_object_or_404(OrganizerContact, pk=contact_id)
        kwargs['instance'] = organizer
        organizer_name = organizer.user.full_name

    form = OrganizerForm(request.POST or None, **kwargs)

    if request.method == 'POST':
        if form.is_valid():
            form.save()
            messages.success(request, _('Organizer contact updated successfully'))
            return redirect(reverse('organizers_index'))
        else:
            messages.error(request, errors_format(form))

    return AdminOrganizersUpdate(form=form, organizer_name=organizer_name).render(request)


@staff_member_required()
@require_http_methods(['GET'])
def delete(request, contact_id):
    organiser = get_object_or_404(OrganizerContact, pk=contact_id)
    organiser.delete()
    messages.success(request, _('Organizer contact removed'))
    return redirect('organizers_index')
