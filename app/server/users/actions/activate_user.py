from django.utils.encoding import force_str
from django.utils.http import urlsafe_base64_decode

from server.users.models import User


class ActivateUser:
    def __init__(self, token_generator, uidb64, token):
        self.token_generator = token_generator
        self.token = token

        try:
            # urlsafe_base64_decode() decodes to bytestring on Python 3
            uid = force_str(urlsafe_base64_decode(uidb64))
            self.user = User.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            self.user = None

    def is_valid(self):
        return self.user is not None and self.token_generator.check_token(self.user, self.token)

    def call(self):
        self.user.is_active = True
        self.user.save()
