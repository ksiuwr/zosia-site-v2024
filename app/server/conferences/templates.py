from typing import Literal, NamedTuple

from reactivated import template, Pick

from .models import Zosia
from server.sponsors.models import Sponsor


@template
class MainPage(NamedTuple):
    zosia: Pick[Zosia, Literal['start_date']]
    sponsors: Pick[Sponsor, Literal['name', 'is_active', 'url', 'path_to_logo', 'sponsor_type']]
    gapi_place_src: str
    zosia_url: str
    registration_open: bool