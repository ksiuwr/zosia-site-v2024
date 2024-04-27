from django.db import models
from django.utils.translation import gettext_lazy as _

from users.models import User


class BlogPost(models.Model):
    title = models.CharField(verbose_name=_("Title"), max_length=200)
    content = models.TextField(verbose_name=_("Content"))
    publication = models.DateTimeField(
        verbose_name=_("Publication date"),
        auto_now_add=True)
    author = models.ForeignKey(
        User, verbose_name=_("author"),
        related_name="blog_posts",
        limit_choices_to={'is_staff': True},
        null=True,
        on_delete=models.SET_NULL)

    class Meta:
        ordering = ['-publication']
        get_latest_by = "publication"

    def __str__(self):
        return self.title
