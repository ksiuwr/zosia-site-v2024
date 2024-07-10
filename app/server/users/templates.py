from typing import NamedTuple, TypedDict
from reactivated import template
from django.contrib.auth.forms import AuthenticationForm

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
    paid: bool
