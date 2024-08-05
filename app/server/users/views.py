from django.contrib import messages
from django.contrib.auth.views import LoginView
from django.contrib.admin.views.decorators import staff_member_required
from django.contrib.auth import login
from django.contrib.auth.decorators import login_required
from django.contrib.auth.tokens import default_token_generator
from django.http import Http404, JsonResponse
from django.shortcuts import get_object_or_404, redirect, render
from django.urls import reverse
from django.utils.html import escape
from django.utils.translation import gettext_lazy as _
from django.views.decorators.http import require_http_methods

from .templates import AccountEdit, Login, Profile, Register, SignUp
from server.conferences.models import Zosia
from server.lectures.models import Lecture
from . import forms
from .actions import ActivateUser
from .forms import OrganizationForm, UserPreferencesAdminForm, UserPreferencesForm
from .models import Organization, UserPreferences
from server.utils.constants import ADMIN_USER_PREFERENCES_COMMAND_CHANGE_BONUS, \
    ADMIN_USER_PREFERENCES_COMMAND_TOGGLE_PAYMENT, BONUS_STEP, MAX_BONUS_MINUTES, \
    MIN_BONUS_MINUTES, PAYMENT_GROUPS, UserInternals
from server.utils.forms import errors_format
from server.utils.views import csv_response


class ReactLoginView(LoginView):
    authentication_form = forms.UserAuthenticationForm

    def render_to_response(self, context, **response_kwargs):
        is_redirected = context.get('next', '') != ''

        return Login(
            form=self.get_form(),
            is_redirected_from_another_page=is_redirected
        ).render(self.request)


@login_required
@require_http_methods(['GET'])
def profile(request):
    user = request.user
    current_zosia: Zosia = Zosia.objects.find_active()

    user_preferences = UserPreferences.objects.select_related('transport', 'zosia').filter(user=user)
    current_prefs = user_preferences.filter(zosia=current_zosia).first()

    registration_open = False
    registration_over = False
    registration_start = None
    enable_editing_preferences = False

    if current_zosia:
        registration_open = current_zosia.is_user_registration_open(user)
        registration_over = current_zosia.is_registration_over
        registration_start = current_zosia.user_registration_start(user)
        enable_editing_preferences = \
            registration_open and not current_zosia.is_registration_over or \
            current_prefs and (current_zosia.is_registration_over or
                               current_zosia.registration_suspended)
     
    price = None
    transfer_title = None
    shirt_type = None
    shirt_size = None
    room = None
    roommate = None
    rooming_start_time = None
    organization = None

    if current_prefs:
        price = current_prefs.price
        transfer_title = current_prefs.transfer_title
        shirt_type = current_prefs.get_shirt_type_display()
        shirt_size = current_prefs.get_shirt_size_display()
        room = current_prefs.room
        roommate = current_prefs.roommate if room else None
        rooming_start_time = current_prefs.rooming_start_time
        organization = current_prefs.organization

    return Profile(
        zosia=current_zosia,
        preferences=current_prefs,

        price=price,
        transfer_title=transfer_title,

        room=room,
        roommate=roommate,
        rooming_start_time=rooming_start_time,

        registration_open=registration_open,
        registration_over=registration_over,
        registration_start=registration_start,
        enable_editing_preferences=enable_editing_preferences,

        shirt_type=shirt_type,
        shirt_size=shirt_size,

        organization=organization
    ).render(request)


@require_http_methods(['GET', 'POST'])
def signup(request):
    form = forms.UserForm(request.POST or None)

    if request.method == 'POST':
        if form.is_valid():
            form.save(request)
            return SignUp(form=form, is_signup_successful=True).render(request)

    return SignUp(form=form).render(request)


@login_required
@require_http_methods(['GET', 'POST'])
def account_edit(request):
    form = forms.EditUserForm(request.POST or None, instance=request.user)
    if form.is_valid():
        form.save()
        return redirect('accounts_profile')
    
    return AccountEdit(form=form).render(request)


@staff_member_required
@require_http_methods(['GET', 'POST'])
def mail_to_all(request):
    form = forms.MailForm(request.POST or None)
    print(request.method)
    if request.method == 'POST':
        print(form.errors)
        if form.is_valid():
            form.send_mail()
            text = form.cleaned_data.get('text')
            subject = form.cleaned_data.get('subject')
            receivers = form.receivers()
            ctx = {'text': text, 'subject': subject, 'receivers': receivers}
            return render(request, 'users/mail_sent.html', ctx)

    ctx = {'form': form}
    return render(request, 'users/mail.html', ctx)


@require_http_methods(['GET', 'POST'])
def activate(request, uidb64, token):
    action = ActivateUser(
        token_generator=default_token_generator,
        uidb64=uidb64,
        token=token,
    )

    if action.is_valid():
        action.call()
        login(request, action.user)
        return redirect('index')

    current_zosia = Zosia.objects.find_active()
    ctx = {
        'zosia': current_zosia,
        'user': action.user,
    }
    return render(request, 'users/activate.html', ctx)


@staff_member_required
@require_http_methods(['GET'])
def organizations(request):
    org = Organization.objects.all()
    ctx = {'organizations': org}
    return render(request, 'users/organizations.html', ctx)


@staff_member_required
@require_http_methods(['GET', 'POST'])
def update_organization(request, pk=None):
    if pk is not None:
        organization = get_object_or_404(Organization, pk=pk)
        form = OrganizationForm(request.POST or None, instance=organization)
    else:
        organization = None
        form = OrganizationForm(request.POST or None)

    if form.is_valid():
        form.save()
        messages.success(request, _('Organization updated'))
        return redirect('organizations')
    ctx = {'form': form, 'organization': organization}
    return render(request, 'users/organization_form.html', ctx)


@staff_member_required
@require_http_methods(['POST'])
def toggle_organization(request):
    organization_id = request.POST.get('key', None)
    organization = get_object_or_404(Organization, pk=organization_id)
    organization.accepted = not organization.accepted
    organization.save(update_fields=['accepted'])
    return JsonResponse({'msg': "{} changed status!".format(
        escape(organization))})


@staff_member_required()
@require_http_methods(['GET'])
def user_preferences_index(request):
    zosia = get_object_or_404(Zosia, active=True)
    # TODO: paging?
    user_preferences = UserPreferences.objects \
        .filter(zosia=zosia).select_related('user') \
        .order_by('pk') \
        .all()
    ctx = {
        'objects': user_preferences,
        'change_bonus': ADMIN_USER_PREFERENCES_COMMAND_CHANGE_BONUS,
        'toggle_payment': ADMIN_USER_PREFERENCES_COMMAND_TOGGLE_PAYMENT,
        'min_bonus': MIN_BONUS_MINUTES,
        'max_bonus': MAX_BONUS_MINUTES,
        'bonus_step': BONUS_STEP,
    }

    return render(request, 'users/user_preferences_index.html', ctx)


@staff_member_required()
@require_http_methods(['GET', 'POST'])
def user_preferences_edit(request, pk=None):
    ctx = {}
    kwargs = {}

    if pk is not None:
        user_preferences = get_object_or_404(UserPreferences, pk=pk)
        ctx['object'] = user_preferences
        kwargs['instance'] = user_preferences

    form = UserPreferencesAdminForm(request.POST or None, **kwargs)
    ctx['form'] = form

    if request.method == 'POST':
        if form.is_valid():
            form.save()
            messages.success(request, _("Form saved!"))

            return redirect(reverse('user_preferences_index'))
        else:
            messages.error(request, errors_format(form))

    return render(request, 'users/user_preferences_edit.html', ctx)


@staff_member_required()
@require_http_methods(['POST'])
def user_preferences_admin_edit(request):
    user_preferences_id = request.POST.get('key', None)
    user_preferences = get_object_or_404(UserPreferences, pk=user_preferences_id)
    command = request.POST.get('command', False)

    if command == ADMIN_USER_PREFERENCES_COMMAND_TOGGLE_PAYMENT:
        status = user_preferences.toggle_payment_accepted()
        user_preferences.save()

        return JsonResponse({
            'msg': _(
                f"Changed payment status of {escape(user_preferences.user.full_name)} to {status}"),
            'status': status
        })

    if command == ADMIN_USER_PREFERENCES_COMMAND_CHANGE_BONUS:
        user_preferences.bonus_minutes = request.POST.get('bonus', user_preferences.bonus_minutes)
        user_preferences.save()

        return JsonResponse({
            'msg': _(
                f"Changed bonus of {escape(user_preferences.user.full_name)} to "
                f"{user_preferences.bonus_minutes}"),
            'bonus': user_preferences.bonus_minutes
        })

    return Http404()


@login_required
@require_http_methods(['GET', 'POST'])
def register(request):
    user = request.user
    zosia: Zosia = Zosia.objects.find_active_or_404()
    user_prefs = UserPreferences.objects.filter(zosia=zosia, user=user).first()
    is_user_already_registered = user_prefs is not None

    if user_prefs is None:
        if not zosia.is_user_registration_open(user):
            messages.error(request, _('Registration for ZOSIA is not open yet'))
            return redirect(reverse('index'))

        if zosia.is_registration_over:
            messages.error(request, _('You missed registration for ZOSIA'))
            return redirect(reverse('index'))

    form_args = {}
    before_discounts = False
    discount = None
    if user_prefs is not None:
        form_args['instance'] = user_prefs
        discount = zosia.get_discount_for_round(
            user_prefs.discount_round
        )
    else:
        discount = zosia.get_discount_for_round(
            UserPreferences.get_current_discount_round(zosia)
        )
        before_discounts = zosia.first_discount_limit == 0

    form = UserPreferencesForm(request.user, request.POST or None, **form_args)

    if user_prefs:
        form.fields['is_student'].disabled = True

    paid = False
    if user_prefs and user_prefs.payment_accepted:
        paid = True
        form.disable()

    if request.method == 'POST':
        if form.is_valid():
            form.call(zosia, not is_user_already_registered)
            messages.success(request, _("Preferences saved!"))

            return redirect(reverse('accounts_profile'))
        else:
            messages.error(request, errors_format(form))

    return Register(
        form=form,
        zosia=zosia,
        is_user_already_registered=is_user_already_registered,
        paid=paid,
        discount=discount,
        before_discounts=before_discounts
    ).render(request)


@staff_member_required
@require_http_methods(['GET'])
def list_csv_preferences_all(request):
    prefs = UserPreferences.objects.select_related('user').order_by("user__last_name",
                                                                    "user__first_name")
    header = ("User", "Student", "Organization", "Paid", "Baggage Transport", "AccommodationDay1", "AccommodationDay2",
              "AccommodationDay3", "DinnerDay1", "BreakfastDay2", "DinnerDay2", "BreakfastDay3",
              "DinnerDay3", "BreakfastDay4", "Vegetarian", "ShirtSize", "ShirtType")
    data_list = [(
        str(p.user), str(p.is_student), ("" if p.organization is None else str(p.organization.name)),
        str(p.payment_accepted), str(p.transport_baggage),
        str(p.accommodation_day_1), str(p.accommodation_day_2), str(p.accommodation_day_3),
        str(p.dinner_day_1),
        str(p.breakfast_day_2), str(p.dinner_day_2), str(p.breakfast_day_3), str(p.dinner_day_3),
        str(p.breakfast_day_4), str(p.vegetarian), str(p.get_shirt_size_display()),
        str(p.get_shirt_type_display())
    ) for p in prefs
    ]
    return csv_response(header, data_list, filename="list_csv_preferences_all")


@staff_member_required
@require_http_methods(['GET'])
def list_csv_preferences_paid(request):
    prefs = UserPreferences.objects.select_related('user').filter(payment_accepted=True) \
        .order_by("user__last_name", "user__first_name")
    header = ("User", "Student", "Organization", "Baggage Transport", "AccommodationDay1", "AccommodationDay2",
              "AccommodationDay3", "DinnerDay1", "BreakfastDay2", "DinnerDay2", "BreakfastDay3",
              "DinnerDay3", "BreakfastDay4", "Vegetarian", "ShirtSize", "ShirtType")
    data_list = [(
        str(p.user), str(p.is_student), ("" if p.organization is None else str(p.organization.name)),
        str(p.transport_baggage),
        str(p.accommodation_day_1), str(p.accommodation_day_2), str(p.accommodation_day_3),
        str(p.dinner_day_1), str(p.breakfast_day_2), str(p.dinner_day_2), str(p.breakfast_day_3),
        str(p.dinner_day_3), str(p.breakfast_day_4), str(p.vegetarian),
        str(p.get_shirt_size_display()),
        str(p.get_shirt_type_display())
    ) for p in prefs
    ]
    return csv_response(header, data_list, filename="list_csv_preferences_paid")


@staff_member_required
@require_http_methods(['GET'])
def list_csv_lectures(request):
    lectures = Lecture.objects.all()
    header = ("Name", "Printed name", "Lecturers", "Duration", "Type",
              "Highlighted", "Comment")
    data = [(
        str(lecture.title), "", str(lecture.all_authors_names), str(lecture.duration),
        str(lecture.lecture_type),
        str("Yes" if lecture.author.person_type == UserInternals.PERSON_SPONSOR else "No"),
        str(lecture.requests),
    ) for lecture in lectures
    ]
    return csv_response(header, data, filename="lectures")
