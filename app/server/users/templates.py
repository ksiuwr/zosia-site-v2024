from datetime import datetime
from typing import List, Literal, NamedTuple
from reactivated import Pick, template
from django.contrib.auth.forms import AuthenticationForm, PasswordChangeForm, PasswordResetForm, SetPasswordForm

from .models import UserPreferences, Zosia
from .forms import EditUserForm, MailForm, UserForm, UserPreferencesForm


@template
class Login(NamedTuple):
    form: AuthenticationForm
    is_redirected_from_another_page: bool


@template
class SignUp(NamedTuple):
    form: UserForm
    is_signup_successful: bool = False


@template
class AccountEdit(NamedTuple):
    form: EditUserForm


@template
class AccountChangePassword(NamedTuple):
    form: PasswordChangeForm


@template
class AccountChangePasswordDone(NamedTuple):
    pass


@template
class AccountResetPassword(NamedTuple):
    form: PasswordResetForm


@template
class AccountResetPasswordDone(NamedTuple):
    pass


@template
class AccountResetPasswordConfirm(NamedTuple):
    validlink: bool
    form: SetPasswordForm


@template
class AccountResetPasswordComplete(NamedTuple):
    pass


@template
class Register(NamedTuple):
    form: UserPreferencesForm
    zosia: Pick[
        Zosia,
        Literal[
            'price_accommodation',
            'price_accommodation_breakfast',
            'price_accommodation_dinner',
            'price_whole_day',
            'price_transport',
            'price_transport_with_discount',
            'price_transfer_baggage',
            'price_base',
        ],
    ]
    is_user_already_registered: bool
    paid: bool
    discount: int
    before_discounts: bool


@template
class Profile(NamedTuple):
    zosia: Pick[
        Zosia, Literal['account_number', 'account_bank', 'account_owner', 'account_address', 'registration_suspended']
    ]
    preferences: Pick[
        UserPreferences,
        Literal[
            'payment_accepted',
            'discount_round',
            'is_student',
            'vegetarian',
            'transport.name',
            'transport.departure_time',
            'transport_baggage',
            'dinner_day_1',
            'accommodation_day_1',
            'breakfast_day_2',
            'dinner_day_2',
            'accommodation_day_2',
            'breakfast_day_3',
            'dinner_day_3',
            'accommodation_day_3',
            'breakfast_day_4',
        ],
    ]

    price: int
    transfer_title: str

    room: str
    roommate: str
    rooming_start_time: datetime

    registration_open: bool
    registration_over: bool
    registration_start: datetime
    enable_editing_preferences: bool

    shirt_type: str
    shirt_size: str

    organization: str


@template
class AdminUsersSendEmail(NamedTuple):
    form: MailForm


@template
class AdminUsersSendEmailComplete(NamedTuple):
    text: str
    subject: str
    receivers: List[str]
