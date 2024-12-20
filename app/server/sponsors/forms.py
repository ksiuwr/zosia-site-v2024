from django import forms
from django.utils.translation import gettext_lazy as _
from .models import Sponsor


class SponsorForm(forms.ModelForm):
    class Meta:
        model = Sponsor
        fields = '__all__'

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['is_active'].label = _("Active?")
