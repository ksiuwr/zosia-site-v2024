from typing import Literal, NamedTuple

from reactivated import template, Pick

from .models import Place, Zosia
from server.sponsors.models import Sponsor


@template
class MainPage(NamedTuple):
    zosia: Pick[Zosia, Literal['start_date', 'registration_start', 'registration_end', 'registration_suspended',
                               'lecture_registration_start', 'lecture_registration_end', 'rooming_start', 'rooming_end']]
    sponsors: Pick[Sponsor, Literal['name', 'is_active', 'url', 'path_to_logo', 'sponsor_type']]
    place: Pick[Place, Literal['name', 'address', 'url']]
    gapi_place_src: str
    registration_open: bool
    zosia_end_date: str