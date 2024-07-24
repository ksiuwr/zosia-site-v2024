from typing import NamedTuple
from reactivated import template
from django.contrib.auth.forms import AuthenticationForm


@template
class Login(NamedTuple):
    form: AuthenticationForm
    is_redirected_from_another_page: bool
