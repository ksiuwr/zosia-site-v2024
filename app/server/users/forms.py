from django import forms
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm, UsernameField
from django.contrib.auth.tokens import default_token_generator
from django.contrib.sites.shortcuts import get_current_site
from django.urls import reverse
from django.utils.safestring import mark_safe
from django.utils.translation import gettext_lazy as _

from server.conferences.models import Transport, Zosia
from .actions import SendActivationEmail, SendEmailToAll
from .models import Organization, User, UserPreferences
from server.utils.constants import PAYMENT_GROUPS

GROUPS = (
    ('pick', 'Pick users'),
    ('all_users', 'All users'),
    ('staff', 'Staff'),
    ('active', 'Active'),
    ('inactive', "Haven't activated their account yet"),
    ('registered', 'Registered to zosia'),
    ('paid', 'Paid for zosia'),
    ('not_paid', "Didn't pay for zosia"),
)


class MailForm(forms.Form):
    subject = forms.CharField()
    text = forms.CharField(widget=forms.Textarea)
    select_groups = forms.ChoiceField(choices=GROUPS, initial=GROUPS[0][0])
    pick = forms.ModelMultipleChoiceField(
        queryset=User.objects.all(), to_field_name="email", required=False)
    all_users = forms.ModelMultipleChoiceField(
        queryset=User.objects.all(), to_field_name="email", required=False)
    staff = forms.ModelMultipleChoiceField(
        queryset=User.objects.filter(is_staff=True),
        to_field_name="email", required=False)
    active = forms.ModelMultipleChoiceField(
        queryset=User.objects.filter(is_active=True),
        to_field_name="email", required=False)
    inactive = forms.ModelMultipleChoiceField(
        queryset=User.objects.filter(is_active=False),
        to_field_name="email", required=False)
    registered = forms.ModelMultipleChoiceField(
        queryset=User.objects.filter(preferences__isnull=False).distinct(),
        to_field_name="email", required=False)
    paid = forms.ModelMultipleChoiceField(
        queryset=User.objects.filter(preferences__payment_accepted=True).distinct(),
        to_field_name="email", required=False)
    not_paid = forms.ModelMultipleChoiceField(
        queryset=User.objects.filter(preferences__payment_accepted=False).distinct(),
        to_field_name="email", required=False)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields["all_users"].initial = (
            User.objects.all().values_list('email', flat=True)
        )
        self.fields["staff"].initial = (
            User.objects.filter(is_staff=True).values_list('email', flat=True)
        )
        self.fields["active"].initial = (
            User.objects.filter(is_active=True).values_list('email', flat=True)
        )
        self.fields["inactive"].initial = (
            User.objects.filter(is_active=False).values_list('email', flat=True)
        )
        self.fields["registered"].initial = (
            User.objects.filter(preferences__isnull=False).distinct()
                .values_list('email', flat=True)
        )
        self.fields["paid"].initial = (
            User.objects.filter(preferences__payment_accepted=True).distinct()
                .values_list('email', flat=True)
        )
        self.fields["not_paid"].initial = (
            User.objects.filter(preferences__payment_accepted=False).distinct()
                .values_list('email', flat=True)
        )

    def receivers(self):
        return self.cleaned_data[self.cleaned_data["select_groups"]]

    def send_mail(self):
        users = self.receivers()
        SendEmailToAll(users=users).call(
            self.cleaned_data['subject'],
            self.cleaned_data['text']
        )
        print(users)


class UserAuthenticationForm(AuthenticationForm):
    username = UsernameField(widget=forms.EmailInput(attrs={"autofocus": True}))


class UserForm(UserCreationForm):
    privacy_consent = forms.BooleanField(required=True)

    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email']

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        label = 'I agree to the Privacy Policy'
        help_text = f'<a href="{reverse("privacy_policy")}" target="_blank" class="link">Read full Privacy Policy</a>'
        self.fields['privacy_consent'].label = mark_safe(label)
        self.fields['privacy_consent'].help_text = mark_safe(help_text)

    def save(self, request):
        user = super().save(commit=False)
        user.is_active = False
        user.save()

        SendActivationEmail(
            user=user,
            site=get_current_site(request),
            token_generator=default_token_generator,
            use_https=request.is_secure(),
        ).call()

        self.user = user
        return user


class EditUserForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ['first_name', 'last_name']


class OrganizationForm(forms.ModelForm):
    class Meta:
        model = Organization
        fields = ['name', 'accepted']


class UserPreferencesWithTransportForm(forms.ModelForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['transport'].queryset = self.transport_queryset(kwargs.get('instance'))

    def transport_queryset(self, instance=None):
        queryset = Transport.objects.find_available(Zosia.objects.find_active(), passenger=instance)
        return queryset


class UserPreferencesForm(UserPreferencesWithTransportForm):
    terms_accepted = forms.BooleanField(required=True)

    use_required_attribute = False

    # NOTE: In hindsight, this sucks.
    # Forget about this whitelist after adding fields
    # and weird stuff happens when someone tries to update preferences.
    CAN_CHANGE_AFTER_PAYMENT_ACCEPTED = ['contact', 'shirt_size', 'shirt_type']

    class Meta:
        model = UserPreferences
        fields = [
            'is_student',
            'student_number',
            'organization',
            'transport',
            'transport_baggage',
            'dinner_day_1',
            'accommodation_day_1',
            'breakfast_day_2',
            'dinner_day_2',
            'accommodation_day_2',
            'breakfast_day_3',
            'dinner_day_3',
            'accommodation_day_3',
            'breakfast_day_4',
            'contact',
            'information',
            'vegetarian',
            'shirt_size',
            'shirt_type',
            'terms_accepted'
        ]

    def __init__(self, user, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.user = user
        self.fields['is_student'].label = "I am a student under 25 and I have a valid Student ID card."

        self.fields['transport_baggage'].label = "I want to have my baggage transferred."

        terms_help_text = f'<a href="{reverse("terms_and_conditions")}" class="link">Read full Terms & Conditions here</a>.'
        self.fields["terms_accepted"].label = 'I agree to Terms & Conditions of ZOSIA.'
        self.fields["terms_accepted"].help_text = mark_safe(terms_help_text)
        self.fields["terms_accepted"].error_messages = \
            {'required': "You have to accept Terms & Conditions."}

        self.fields['organization'].queryset = Organization.objects.order_by("-accepted", "name")

    def call(self, zosia, first_call):
        user_preferences = self.save(commit=False)
        user_preferences.user = self.user
        user_preferences.zosia = zosia
        if first_call and user_preferences.is_student:
            user_preferences.discount_round = UserPreferences.get_current_discount_round(zosia)
        user_preferences.save()

        return user_preferences

    def clean(self):
        cleaned_data = super().clean()

        def _pays_for(d):
            return cleaned_data.get(d, False)

        if (_pays_for('accommodation_day_1') and _pays_for('accommodation_day_3')
                and not _pays_for('accommodation_day_2')):
            self.add_error(
                        'accommodation_day_2',
                        forms.ValidationError(
                            _("When choosing the other days, this one must also be chosen. Please check `%(accomm)s`"),
                            code='invalid',
                            params={'accomm': self.fields['accommodation_day_2'].label}
                        )
                    )

        for accommodation, meals in PAYMENT_GROUPS.items():
            for m in meals.values():
                if _pays_for(m) and not _pays_for(accommodation):
                    self.add_error(
                        m,
                        forms.ValidationError(
                            _("You need to check `%(accomm)s` before you can check `%(meal)s`"),
                            code='invalid',
                            params={'accomm': self.fields[accommodation].label,
                                    'meal': self.fields[m].label}
                        )
                    )

            # TODO: this is the hotfix for ZOSIA 2024 agreement
            if _pays_for(accommodation) and not _pays_for(meals["breakfast"]):
                self.add_error(
                    meals['breakfast'],
                    forms.ValidationError(
                        _("This year breakfast is required (its price is included in accommodation price). Please check `%(meal)s`"),
                        code='invalid',
                        params={'accomm': self.fields[accommodation].label,
                                'meal': self.fields[meals['breakfast']].label}
                    )
                )

            if _pays_for(accommodation) and not _pays_for(meals["dinner"]):
                self.add_error(
                    meals['dinner'],
                    forms.ValidationError(
                        _("This year dinner is required (its price is included in accommodation price). Please check `%(meal)s`"),
                        code='invalid',
                        params={'accomm': self.fields[accommodation].label,
                                'meal': self.fields[meals['dinner']].label}
                    )
                )

    def disable(self):
        for field in self.fields:
            if field not in self.CAN_CHANGE_AFTER_PAYMENT_ACCEPTED:
                self.fields[field].disabled = True


class UserPreferencesAdminForm(UserPreferencesWithTransportForm):
    class Meta:
        model = UserPreferences
        exclude = [
            'user',
            'zosia',
            'organization',
            'accommodation_day_1',
            'dinner_day_1',
            'accommodation_day_2',
            'dinner_day_2',
            'breakfast_day_2',
            'accommodation_day_3',
            'dinner_day_3',
            'breakfast_day_3',
            'breakfast_day_4',
            'vegetarian',
            'discount_round'
        ]

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['contact'].disabled = True
