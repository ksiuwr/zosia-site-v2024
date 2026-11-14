import re

from django.db import models
from django.utils.translation import gettext_lazy as _
from server.users.models import User


def bgg_id_from_url(url):
    match = re.search(r'boardgame/([0-9]+)', url or '')
    # Through int, so that boardgame/013 and boardgame/13 count as the same game
    return str(int(match.group(1))) if match else None


class Boardgame(models.Model):
    name = models.CharField(verbose_name=_(
        "Name of the boardgame"), max_length=200)
    bgg_id = models.CharField(max_length=32, unique=True)
    accepted = models.BooleanField(default=False)
    user = models.ForeignKey(User, on_delete=models.PROTECT, null=False)
    url = models.CharField(verbose_name=_(
        "Url to boardgamegeek.com"), max_length=200)

    def __str__(self):
        return self.name

    def clean(self):
        # Duplicates are found by bgg_id, so it has to follow the url when it's edited in the admin
        self.bgg_id = bgg_id_from_url(self.url) or self.bgg_id

    def toggle_accepted(self):
        self.accepted = not self.accepted
        self.save()


class Vote(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE)
    boardgame = models.ForeignKey(
        Boardgame,
        on_delete=models.CASCADE,
        related_name="boardgame_votes"
    )

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['user', 'boardgame'], name='unique_vote_per_boardgame')
        ]
