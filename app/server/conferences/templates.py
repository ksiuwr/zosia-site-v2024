from typing import List, Literal, NamedTuple

from reactivated import template, Pick

from .forms import PlaceForm, TransportForm, ZosiaForm

from .models import Place, Transport, Zosia
from server.sponsors.models import Sponsor
from server.users.models import UserPreferences


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


@template
class PrivacyPolicy(NamedTuple):
    pass


@template
class SignupRules(NamedTuple):
    pass


@template
class AdminPanelHome(NamedTuple):
    pass


@template
class AdminConferencesList(NamedTuple):
    conferences: List[Pick[Zosia, Literal['id', 'start_date']]]


@template
class AdminConferencesUpdate(NamedTuple):
    form: ZosiaForm
    edit_mode: bool


@template
class AdminPlacesList(NamedTuple):
    places: List[Pick[Place, Literal['id', 'name']]]


@template
class AdminPlacesUpdate(NamedTuple):
    form: PlaceForm
    edit_mode: bool


@template
class AdminTransportList(NamedTuple):
    transports: List[Pick[Transport, Literal['id', 'name', 'departure_time', 'capacity', 'passengers.id']]]


@template
class AdminTransportPassangers(NamedTuple):
    transport: Pick[Transport, Literal['id', 'name', 'departure_time']]
    users: List[Pick[UserPreferences, Literal['id', 'is_student', 'user.first_name', 'user.last_name']]]


@template
class AdminTransportUpdate(NamedTuple):
    form: TransportForm
    edit_mode: bool
