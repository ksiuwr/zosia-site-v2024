from django import forms
from .models import QA


class QAForm(forms.ModelForm):
    class Meta:
        model = QA
        fields = '__all__'
        widgets = {'answer': forms.Textarea()}
