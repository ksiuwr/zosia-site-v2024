from django.http import HttpRequest
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