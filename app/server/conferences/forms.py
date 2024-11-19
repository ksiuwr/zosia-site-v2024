from django import forms

from .models import Place, Transport, Zosia


class UTCDateTimePickerField(forms.DateTimeField):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.help_text = "Provide date and time in <b>UTC</b> time zone!"


class TransportForm(forms.ModelForm):
    class Meta:
        model = Transport
        fields = '__all__'
        field_classes = {
            "departure_time": UTCDateTimePickerField
        }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)


class PlaceForm(forms.ModelForm):
    class Meta:
        fields = '__all__'
        model = Place

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)


class ZosiaForm(forms.ModelForm):
    class Meta:
        model = Zosia
        fields = '__all__'
        field_classes = {
            "early_registration_start": UTCDateTimePickerField,
            "registration_start": UTCDateTimePickerField,
            "registration_end": UTCDateTimePickerField,
            "lecture_registration_start": UTCDateTimePickerField,
            "lecture_registration_end": UTCDateTimePickerField,
            "rooming_start": UTCDateTimePickerField,
            "rooming_end": UTCDateTimePickerField,
        }

    def __init__(self, *args, **kwargs):
        super(ZosiaForm, self).__init__(*args, **kwargs)
