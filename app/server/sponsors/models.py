from django.db import models
from django.utils.translation import gettext_lazy as _

from server.utils.constants import SPONSOR_TYPE, SponsorInternals


class Sponsor(models.Model):
    name = models.CharField(verbose_name=_("Name"), max_length=200, unique=True)
    is_active = models.BooleanField(verbose_name=_("Active"), default=False)
    url = models.URLField(verbose_name=_("URL"), max_length=200)
    path_to_logo = models.CharField(verbose_name=_("Path to logo"), max_length=300, blank=True,
                                    null=True)
    path_to_logo_dark_mode = models.CharField(
        verbose_name=_("Path to logo for dark mode"),
        help_text=_(
            "This image will be shown when dark mode is enabled. If not specified, then the default logo specified above will be shown."
        ),
        max_length=300,
        blank=True,
        null=True,
    )
    sponsor_type = models.CharField(verbose_name=_("Type"), max_length=10, choices=SPONSOR_TYPE,
                                    default=SponsorInternals.TYPE_BRONZE)

    def __str__(self):
        return self.name

    def toggle_active(self):
        self.is_active = not self.is_active
        self.save()
