from django.utils import timezone
from django.http import HttpRequest
from server.utils.time_manager import format_in_zone
from typing import TypedDict


class UserInfo(TypedDict):
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
    context = ServerTimeContext()
    context["server_time"] = format_in_zone(timezone.now(), 'UTC', "%Y-%m-%dT%H:%M:%SZ")
    return context