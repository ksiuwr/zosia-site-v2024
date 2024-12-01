from django.utils import timezone
from django.http import HttpRequest
from server.utils.recaptcha import RECAPTCHA_TEST_PUBLIC_KEY, RECAPTCHA_TOKEN_FIELD_NAME
from server import settings
from server.utils.time_manager import format_in_zone
from typing import TypedDict


class UserInfo(TypedDict):
    id: int
    is_authenticated: bool
    is_staff: bool
    email: str
    first_name: str
    last_name: str


class UserContext(TypedDict):
    user: UserInfo


def user_context(request: HttpRequest) -> UserContext:
    return {
        "user": {
            "id": request.user.id if not request.user.is_anonymous else None,
            "is_authenticated": request.user.is_authenticated,
            "is_staff": request.user.is_staff,
            "email": request.user.email if not request.user.is_anonymous else "",
            "first_name": request.user.first_name if not request.user.is_anonymous else "",
            "last_name": request.user.last_name if not request.user.is_anonymous else "",
        }
    }


class ServerTimeContext(TypedDict):
    server_time: str


def server_time_context(request: HttpRequest) -> ServerTimeContext:
    return {"server_time": format_in_zone(timezone.now(), 'UTC', "%Y-%m-%dT%H:%M:%SZ")}


class RecaptchaInfo(TypedDict):
    site_key: str
    token_field_name: str


class ReCaptchaContext(TypedDict):
    recaptcha: RecaptchaInfo


def recaptcha_context(request: HttpRequest) -> ReCaptchaContext:
    return {
        "recaptcha": {
            "site_key": getattr(settings, "RECAPTCHA_PUBLIC_KEY", RECAPTCHA_TEST_PUBLIC_KEY),
            "token_field_name": RECAPTCHA_TOKEN_FIELD_NAME,
        }
    }
