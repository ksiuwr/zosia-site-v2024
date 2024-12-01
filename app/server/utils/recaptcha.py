import json

from django.http import HttpRequest
from django.contrib import messages
from django.conf import settings
from urllib.error import HTTPError
from urllib.parse import urlencode
from urllib.request import Request, build_opener


# Test keys as per https://developers.google.com/recaptcha/docs/faq
# "With the following test keys, you will always get No CAPTCHA and all
# verification requests will pass."
RECAPTCHA_TEST_PUBLIC_KEY = "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
RECAPTCHA_TEST_PRIVATE_KEY = "6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe"
RECAPTCHA_DEFAULT_DOMAIN = "www.google.com"

RECAPTCHA_TOKEN_FIELD_NAME = "recaptcha-token"


class RecaptchaResponse:
    def __init__(self, is_valid, error_codes=None, extra_data=None, action=None):
        self.is_valid = is_valid
        self.error_codes = error_codes or []


def recaptcha_request(params):
    request_object = Request(
        url="https://%s/recaptcha/api/siteverify" % getattr(settings, "RECAPTCHA_DOMAIN", RECAPTCHA_DEFAULT_DOMAIN),
        data=params,
        headers={
            "Content-type": "application/x-www-form-urlencoded",
            "User-agent": "reCAPTCHA Django",
        },
    )

    # Get response from POST to Google endpoint.
    opener = build_opener()
    return opener.open(
        request_object,
        timeout=getattr(settings, "RECAPTCHA_VERIFY_REQUEST_TIMEOUT", 10),
    )


def submit(recaptcha_response, private_key):
    """
    Submits a reCAPTCHA request for verification. Returns RecaptchaResponse
    for the request

    recaptcha_response -- The value of reCAPTCHA response from the form
    private_key -- your reCAPTCHA private key
    """
    params = urlencode(
        {
            "secret": private_key,
            "response": recaptcha_response,
            "remoteip": "",
        }
    )

    params = params.encode("utf-8")

    response = recaptcha_request(params)
    data = json.loads(response.read().decode("utf-8"))
    response.close()
    return RecaptchaResponse(
        is_valid=data.pop("success"),
        error_codes=data.pop("error-codes", None),
    )


def is_recaptcha_valid(request: HttpRequest) -> bool:
    token = request.POST.get(RECAPTCHA_TOKEN_FIELD_NAME)
    if not token:
        messages.error(request, "Recaptcha token is missing.")
        return False

    try:
        check_captcha = submit(
            recaptcha_response=token,
            private_key=getattr(settings, "RECAPTCHA_PRIVATE_KEY", RECAPTCHA_TEST_PRIVATE_KEY),
        )
    except HTTPError:  # Catch timeouts, etc
        messages.error(request, "Recaptcha verification failed.")
        return False

    if not check_captcha.is_valid:
        messages.error(request, "Recaptcha verification failed.")
        print("Recaptcha error: ", check_captcha.error_codes)
        return False

    return True
