from typing import List, Literal, NamedTuple

from reactivated import template, Pick

from .models import Place, Zosia
from server.sponsors.models import Sponsor


@template
class HomePage(NamedTuple):
    zosia: Pick[Zosia, Literal['start_date', 'registration_start', 'registration_end', 'registration_suspended',
                               'lecture_registration_start', 'lecture_registration_end', 'rooming_start', 'rooming_end']]
    sponsors: List[Pick[Sponsor, Literal['name', 'is_active', 'url', 'path_to_logo', 'sponsor_type']]]
    place: Pick[Place, Literal['name', 'address', 'url']]
    gapi_key: str
    registration_open: bool
    zosia_end_date: str

@template
class TermsAndConditions(NamedTuple):
    zosia: Pick[Zosia, Literal['start_date']]
    zosia_end_date: str
    zosia_title: str
    place: Pick[Place, Literal['town']]