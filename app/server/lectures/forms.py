from django import forms

from .models import Lecture, Schedule


class LectureForm(forms.ModelForm):
    class Meta:
        model = Lecture
        fields = ['title', 'abstract', 'lecture_type', 'duration', 'supporters_names', 'requests',
                  'events']


class LectureAdminForm(forms.ModelForm):
    class Meta:
        model = Lecture
        fields = ['accepted', 'author', 'supporting_authors', 'supporters_names', 'description',
                  'title', 'abstract', 'lecture_type', 'duration', 'requests', 'events']
        widgets = {
            'supporters_names': forms.Textarea(attrs={'disabled': 'True'}),
        }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['accepted'].checkbox = True
        self.fields['supporters_names'].disabled = True


class ScheduleForm(forms.ModelForm):
    class Meta:
        model = Schedule
        fields = ['schedule_data']
