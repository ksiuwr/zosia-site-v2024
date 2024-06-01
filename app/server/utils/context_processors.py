from django.http import HttpRequest
from server.utils.constants import DEFAULT_TIME_FORMAT
from server.utils.time_manager import now
from server.users.models import User
from typing import Dict, TypedDict

class UserContext(TypedDict):
    is_authenticated: bool = False
    is_staff: bool = False
    email: str = ""
    first_name: str = ""
    last_name: str = ""

def user_context(request: HttpRequest) -> UserContext:
    context = UserContext()

    if hasattr(request, "user"):
        user = request.user
        if (not user.is_anonymous):
            context["is_authenticated"] = user.is_authenticated
            context["is_staff"] = user.is_staff
            context["email"] = user.email
            context["first_name"] = user.first_name
            context["last_name"] = user.last_name


    return context


class ServerTimeContext(TypedDict):
    server_time: str
    current_year: int

def server_time_context(request: HttpRequest) -> ServerTimeContext:
    context = ServerTimeContext()
    context["server_time"] = now().strftime(DEFAULT_TIME_FORMAT)
    context["current_year"] = now().year
    return context