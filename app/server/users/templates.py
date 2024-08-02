from datetime import datetime
from typing import Literal, NamedTuple
from reactivated import Pick, template
from django.contrib.auth.forms import AuthenticationForm

from .models import UserPreferences, Zosia
from .forms import UserForm, UserPreferencesForm


@template
class Login(NamedTuple):
    form: AuthenticationForm
    is_redirected_from_another_page: bool


@template
class SignUp(NamedTuple):
    form: UserForm
    is_signup_successful: bool = False


@template
class Register(NamedTuple):
    form: UserPreferencesForm
    zosia: Pick[
        Zosia,
        'price_accommodation',
        'price_accommodation_breakfast',
        'price_accommodation_dinner',
        'price_whole_day',
        'price_transport',
        'price_transport_with_discount',
        'price_transfer_baggage',
        'price_base',
    ]
    is_user_already_registered: bool
    paid: bool
    discount: int
    before_discounts: bool


@template
class Profile(NamedTuple):
    zosia: Pick[Zosia, 'account_number', 'account_bank', 'account_owner', 'account_address']
    preferences: Pick[UserPreferences, 'payment_accepted', 'discount_round', 'is_student']

    price: int
    transfer_title: str

    room: str
    roommate: str
    rooming_start_time: datetime

    registration_open: bool
    registration_start: datetime
    enable_preferences: bool
