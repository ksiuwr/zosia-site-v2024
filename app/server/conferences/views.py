from collections import Counter
import csv

from django.conf import settings
from django.contrib import messages
from django.contrib.admin.views.decorators import staff_member_required
from django.http import HttpResponse, JsonResponse
from django.shortcuts import get_object_or_404, redirect
from django.utils.translation import gettext_lazy as _
from django.views.decorators.http import require_http_methods

from .forms import PlaceForm, TransportForm, ZosiaForm
from .models import Place, Transport, Zosia
from .templates import (
    AdminConferencesList,
    AdminConferencesUpdate,
    AdminPanelHome,
    AdminPlacesList,
    AdminPlacesUpdate,
    AdminStatistics,
    AdminTransportList,
    AdminTransportPassangers,
    AdminTransportUpdate,
    HomePage,
    StatisticsCostData,
    StatisticsDiscountData,
    StatisticsTransportData,
    StatisticsUserPreferencesData,
    TermsAndConditions,
    PrivacyPolicy,
    SignupRules,
)
from server.lectures.models import Lecture
from server.organizers.models import OrganizerContact
from server.sponsors.models import Sponsor
from server.users.models import User, UserPreferences
from server.utils.constants import SHIRT_SIZE_CHOICES, SHIRT_TYPES_CHOICES
from server.utils.views import csv_response


@staff_member_required()
@require_http_methods(['GET'])
def export_data(request):
    zosia = Zosia.objects.find_active_or_404()

    prefs = UserPreferences.objects \
        .filter(zosia=zosia) \
        .values('user__first_name', 'user__last_name', 'user__email', 'user__person_type',
                'organization__name', 'transport__name', 'transport__departure_time',
                'accommodation_day_1', 'dinner_day_1', 'accommodation_day_2', 'breakfast_day_2',
                'dinner_day_2', 'accommodation_day_3', 'breakfast_day_3', 'dinner_day_3',
                'breakfast_day_4', 'contact', 'information', 'vegetarian', 'payment_accepted',
                'shirt_size', 'shirt_type', 'is_student', 'transport_baggage')

    lectures = Lecture.objects \
        .filter(zosia=zosia) \
        .values('author__first_name', 'author__last_name', 'title', 'abstract',
                'author__preferences__organization__name', 'description')

    sponsors = Sponsor.objects \
        .values('name', 'sponsor_type', 'path_to_logo')

    organizers_contacts = OrganizerContact.objects \
        .filter(zosia=zosia) \
        .values('user__first_name', 'user__last_name', 'phone_number')

    data = {
        "zosia": {
            "start_date": zosia.start_date,
            "end_date": zosia.end_date
        },
        "contacts": list(organizers_contacts),
        "lectures": list(lectures),
        "preferences": list(prefs),
        "sponsors": list(sponsors)
    }

    return JsonResponse(data)


@staff_member_required()
@require_http_methods(['GET'])
def export_shirts(request):
    zosia = get_object_or_404(Zosia, active=True)
    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename="shirts.csv"'

    writer = csv.writer(response)
    writer.writerow(['Size', 'Type', 'Registered', 'Payed'])
    for shirt_size in SHIRT_SIZE_CHOICES:
        for shirt_type in SHIRT_TYPES_CHOICES:
            reg_count = UserPreferences.objects \
                .filter(zosia=zosia, shirt_size=shirt_size[0], shirt_type=shirt_type[0]) \
                .count()
            pay_count = UserPreferences.objects. \
                filter(zosia=zosia, shirt_size=shirt_size[0], shirt_type=shirt_type[0],
                       payment_accepted=True) \
                .count()
            writer.writerow([shirt_size[1], shirt_type[1], reg_count, pay_count])

    return response


@require_http_methods(['GET'])
def index(request):
    user: User = request.user
    zosia = Zosia.objects.find_active()
    sponsors = Sponsor.objects.filter(is_active=True)

    return HomePage(
        zosia=zosia,
        sponsors=sponsors,
        place=zosia.place if zosia is not None else None,
        gapi_key=settings.GAPI_KEY,
        registration_open=zosia.is_user_registration_open(user) if zosia is not None else False,
        zosia_end_date=zosia.end_date if zosia is not None else ""
    ).render(request)


@require_http_methods(['GET'])
def terms_and_conditions(request):
    zosia = Zosia.objects.find_active()

    return TermsAndConditions(
        zosia=zosia,
        zosia_end_date=zosia.end_date if zosia is not None else "",
        zosia_title=str(zosia) if zosia is not None else "",
        place=zosia.place if zosia is not None else None
    ).render(request)


@require_http_methods(['GET'])
def privacy_policy(request):
    return PrivacyPolicy().render(request)


@require_http_methods(['GET'])
def sign_up_rules_for_invited(request):
    return SignupRules().render(request)


@staff_member_required
@require_http_methods(['GET'])
def admin_panel(request):
    return AdminPanelHome().render(request)


@staff_member_required
@require_http_methods(['GET'])
def transport(request):
    zosia = Zosia.objects.find_active()
    transports = Transport.objects.filter(zosia=zosia)
    return AdminTransportList(transports=transports).render(request)


@staff_member_required
@require_http_methods(['GET'])
def transport_people(request, pk):
    transport_obj = get_object_or_404(Transport, pk=pk)
    users = UserPreferences.objects.select_related('user').filter(transport=transport_obj)
    return AdminTransportPassangers(transport=transport_obj, users=users).render(request)


@staff_member_required
@require_http_methods(['GET', 'POST'])
def transport_add(request, pk=None):
    active_zosia = Zosia.objects.find_active()
    if pk is not None:
        instance = get_object_or_404(Transport, pk=pk)
        form = TransportForm(request.POST or None, initial={'zosia': active_zosia},
                             instance=instance)
    else:
        instance = None
        form = TransportForm(request.POST or None, initial={'zosia': active_zosia})

    if form.is_valid():
        form.save()
        messages.success(request, _('Transport has been saved'))
        return redirect('transport')

    return AdminTransportUpdate(form=form, edit_mode=instance is not None).render(request)


@staff_member_required
@require_http_methods(['GET'])
def conferences(request):
    all_conferences = Zosia.objects.all()
    return AdminConferencesList(conferences=all_conferences).render(request)


@staff_member_required
@require_http_methods(['GET', 'POST'])
def update_zosia(request, pk=None):
    if pk is not None:
        zosia = get_object_or_404(Zosia, pk=pk)
        form = ZosiaForm(request.POST or None, instance=zosia)
    else:
        zosia = None
        form = ZosiaForm(request.POST or None)

    if form.is_valid():
        form.save()
        messages.success(request, _('Zosia has been saved'))
        return redirect('conferences')

    return AdminConferencesUpdate(form=form, edit_mode=zosia is not None).render(request)


@staff_member_required
@require_http_methods(['GET'])
def place(request):
    places = Place.objects.filter()
    return AdminPlacesList(places=places).render(request)


@staff_member_required
@require_http_methods(['GET', 'POST'])
def place_add(request, pk=None):
    if pk is not None:
        instance = get_object_or_404(Place, pk=pk)
        form = PlaceForm(request.POST or None, instance=instance)
    else:
        instance = None
        form = PlaceForm(request.POST or None)

    if form.is_valid():
        form.save()
        messages.success(request, _('Place has been saved'))
        return redirect('place')

    return AdminPlacesUpdate(form=form, edit_mode=instance is not None).render(request)


@staff_member_required
@require_http_methods(['GET'])
def list_csv_transport_by_user(request):
    prefs = UserPreferences.objects.select_related('user').filter(transport__isnull=False) \
        .order_by("user__last_name", "user__first_name")
    data_list = [(str(p.user), str(p.transport), str(p.payment_accepted)) for p in prefs]
    return csv_response(("User", "Transport", "Paid"), data_list,
                        filename='list_csv_transport_by_user')


@staff_member_required
@require_http_methods(['GET'])
def list_csv_all_users_by_transport(request):
    transport_list = Transport.objects.order_by("departure_time")
    data_list = [(str(t), t.passengers_to_string()) for t in transport_list]
    return csv_response(("Transport", "All users"), data_list,
                        filename='list_csv_all_users_by_transport')


@staff_member_required
@require_http_methods(['GET'])
def list_csv_paid_users_by_transport(request):
    transport_list = Transport.objects.order_by("departure_time")
    data_list = [(str(t), t.passengers_to_string(paid=True)) for t in transport_list]
    return csv_response(("Transport", "Paid users"), data_list,
                        filename='list_csv_paid_users_by_transport')


@staff_member_required
@require_http_methods(['GET'])
def list_csv_paid_students_by_transport(request):
    transport_list = Transport.objects.order_by("departure_time")
    data_list = [(str(t), t.passengers_to_string(paid=True, is_student=True))
                 for t in transport_list]
    return csv_response(("Transport", "Paid student users"), data_list,
                        filename='list_csv_paid_student_users_by_transport')


@staff_member_required
@require_http_methods(['GET'])
def list_csv_paid_non_students_by_transport(request):
    transport_list = Transport.objects.order_by("departure_time")
    data_list = [(str(t), t.passengers_to_string(paid=True, is_student=False))
                 for t in transport_list]
    return csv_response(("Transport", "Paid non-student users"), data_list,
                        filename='list_csv_paid_non_student_users_by_transport')


@staff_member_required
@require_http_methods(['GET'])
def statistics(request):
    zosia = Zosia.objects.find_active_or_404()
    user_prefs = UserPreferences.objects.filter(zosia=zosia)

    # data for first chart
    users_count = User.objects.count()
    prefs_count = user_prefs.count()
    paid_count = user_prefs.filter(payment_accepted=True).count()

    # data for second chart
    if len(user_prefs):
        price_items = Counter([t.price for t in user_prefs]).items()
        price_values, price_counts = zip(*sorted(price_items))
    else:
        price_values, price_counts = [], []

    # data for transport info chart
    transport_list = Transport.objects.all()
    transport_labels = []
    transport_values = {'paid': [], 'not_paid': [], 'empty': []}
    for t in transport_list:
        transport_labels.append(f'{t}')
        transport_values['paid'].append(t.paid_passengers_count)
        transport_values['not_paid'].append(t.passengers_count - t.paid_passengers_count)
        transport_values['empty'].append(t.free_seats)

    # discount
    discounts = list(
        user_prefs.filter(discount_round__gt=0).values_list('discount_round', flat=True))

    # other data
    vegetarians = user_prefs.filter(vegetarian=True).count()
    students = user_prefs.filter(is_student=True).count()

    return AdminStatistics(
        num_of_registered_users=prefs_count,
        num_of_vegetarians=vegetarians,
        num_of_students=students,
        discount_data=StatisticsDiscountData(
            num_of_taken_discounts_per_round=[discounts.count(x) for x in (1, 2, 3)],
            available_discounts_per_round=[
                zosia.first_discount_limit - discounts.count(1),
                zosia.second_discount_limit - discounts.count(2),
                zosia.third_discount_limit - discounts.count(3),
            ],
        ),
        user_preferences_data=StatisticsUserPreferencesData(
            num_of_users_with_payment=paid_count,
            num_of_users_with_prefs_only=prefs_count - paid_count,
            num_of_users_without_prefs=users_count - prefs_count,
        ),
        cost_data=StatisticsCostData(
            cost_values=list(price_values),
            cost_counts=list(price_counts),
        ),
        transport_data=StatisticsTransportData(
            transport_labels=transport_labels,
            transport_values=transport_values,
        ),
    ).render(request)
