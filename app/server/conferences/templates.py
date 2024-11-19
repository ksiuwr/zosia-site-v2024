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


class StatisticsDiscountData(NamedTuple):
    num_of_taken_discounts_per_round: List[int]
    available_discounts_per_round: List[int]


class StatisticsUserPreferencesData(NamedTuple):
    num_of_users_with_payment: int
    num_of_users_with_prefs_only: int
    num_of_users_without_prefs: int


class StatisticsCostData(NamedTuple):
    cost_values: List[int]
    cost_counts: List[int]


class StatisticsTransportData(NamedTuple):
    class TransportDataValues(NamedTuple):
        paid: List[int]
        not_paid: List[int]
        empty: List[int]

    transport_labels: List[str]
    transport_values: TransportDataValues


@template
class AdminStatistics(NamedTuple):
    num_of_registered_users: int
    num_of_vegetarians: int
    num_of_students: int
    discount_data: StatisticsDiscountData
    user_preferences_data: StatisticsUserPreferencesData
    cost_data: StatisticsCostData
    transport_data: StatisticsTransportData
