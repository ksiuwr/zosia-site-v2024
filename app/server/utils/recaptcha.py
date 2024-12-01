from django.http import HttpRequest
from django.contrib import messages
from django_recaptcha import client
from django_recaptcha.constants import TEST_PRIVATE_KEY
from urllib.error import HTTPError

from server import settings


RECAPTCHA_TOKEN_FIELD_NAME = "recaptcha-token"


def is_recaptcha_valid(request: HttpRequest) -> bool:
    token = request.POST.get(RECAPTCHA_TOKEN_FIELD_NAME)
    if not token:
        messages.error(request, "Recaptcha token is missing.")
        return False

    try:
        check_captcha = client.submit(
            recaptcha_response=token,
            private_key=getattr(settings, "RECAPTCHA_PRIVATE_KEY", TEST_PRIVATE_KEY),
            remoteip="",
        )
    except HTTPError:  # Catch timeouts, etc
        messages.error(request, "Recaptcha verification failed.")
        return False

    if not check_captcha.is_valid:
        messages.error(request, "Recaptcha verification failed.")
        print("Recaptcha error: ", check_captcha.error_codes)
        return False

    return True
