from typing import List, Literal, NamedTuple
from reactivated import Pick, template

from .forms import OrganizerForm
from .models import OrganizerContact


@template
class AdminOrganizersList(NamedTuple):
    organizers: List[Pick[OrganizerContact, Literal['id', 'user.first_name', 'user.last_name', 'phone_number']]]


@template
class AdminOrganizersUpdate(NamedTuple):
    form: OrganizerForm
    organizer_name: str = ''
