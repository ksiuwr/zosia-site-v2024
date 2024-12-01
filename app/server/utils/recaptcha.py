from django.http import HttpRequest
from django.contrib import messages
from django_recaptcha import client
from urllib.error import HTTPError

from server import settings

# Test keys as per https://developers.google.com/recaptcha/docs/faq
# "With the following test keys, you will always get No CAPTCHA and all
# verification requests will pass."
RECAPTCHA_TEST_PUBLIC_KEY = "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
RECAPTCHA_TEST_PRIVATE_KEY = "6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe"

RECAPTCHA_TOKEN_FIELD_NAME = "recaptcha-token"


def is_recaptcha_valid(request: HttpRequest) -> bool:
    token = request.POST.get(RECAPTCHA_TOKEN_FIELD_NAME)
    if not token:
        messages.error(request, "Recaptcha token is missing.")
        return False

    try:
        check_captcha = client.submit(
            recaptcha_response=token,
            private_key=getattr(settings, "RECAPTCHA_PRIVATE_KEY", RECAPTCHA_TEST_PRIVATE_KEY),
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
