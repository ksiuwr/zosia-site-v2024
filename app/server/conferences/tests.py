from datetime import timedelta

from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError
from django.test import TestCase
from django.urls import reverse

from .models import Transport, Zosia
from server.utils.constants import UserInternals
from server.utils.test_helpers import create_transport, create_user, create_user_preferences, create_zosia
from server.utils.time_manager import now, time_point

User = get_user_model()


class ZosiaTestCase(TestCase):
    def setUp(self):
        self.normal = create_user(0)
        self.active = create_zosia(active=True)

    def test_only_one_active_Zosia_can_exist(self):
        """Creating another active Zosia throws an error"""
        with self.assertRaises(ValidationError):
            create_zosia(active=True).full_clean()

    def test_find_active(self):
        """Zosia.find_active returns active Zosia"""
        self.assertEqual(self.active.pk, Zosia.objects.find_active().pk)

    def test_end_date(self):
        """Zosia has 4 days"""
        self.assertEqual(self.active.end_date, self.active.start_date + timedelta(days=3))

    def test_registration_is_not_full_when_limit_is_zero(self):
        create_user_preferences(self.normal, self.active)

        self.assertFalse(self.active.is_registration_full)

    def test_registration_is_not_full_below_limit(self):
        self.active.registration_limit = 2
        self.active.save()
        create_user_preferences(self.normal, self.active)

        self.assertFalse(self.active.is_registration_full)
        self.assertTrue(self.active.is_user_registration_open(self.normal))

    def test_registration_is_suspended_when_limit_is_reached(self):
        self.active.registration_limit = 1
        self.active.save()
        create_user_preferences(self.normal, self.active)

        self.assertTrue(self.active.is_registration_full)
        self.assertFalse(self.active.is_user_registration_open(self.normal))

    def test_privileged_user_cannot_register_when_registration_limit_is_reached(self):
        privileged = create_user(1, person_type=UserInternals.PERSON_PRIVILEGED)
        self.active.registration_limit = 1
        self.active.save()
        create_user_preferences(self.normal, self.active)

        self.assertFalse(self.active.is_user_registration_open(privileged))

    def test_privileged_user_can_register_when_registration_is_manually_suspended(self):
        privileged = create_user(1, person_type=UserInternals.PERSON_PRIVILEGED)
        self.active.registration_suspended = True
        self.active.save()

        self.assertTrue(self.active.is_user_registration_open(privileged))

    def test_registration_limit_cannot_be_negative(self):
        self.active.registration_limit = -1

        with self.assertRaises(ValidationError):
            self.active.full_clean()

    def test_can_user_choose_room_when_at_user_start_time(self):
        self.active.rooming_start = now()
        self.active.save()
        user_prefs = create_user_preferences(self.normal, self.active, payment_accepted=True,
                                             bonus_minutes=0)

        result = self.active.can_user_choose_room(user_prefs)
        self.assertTrue(result)

    def test_can_user_choose_room_when_before_user_start_time(self):
        self.active.rooming_start = time_point(2016, 12, 23, 0, 0)
        self.active.save()
        user_prefs = create_user_preferences(self.normal, self.active, payment_accepted=True,
                                             bonus_minutes=1)

        result = self.active.can_user_choose_room(user_prefs, time=time_point(2016, 12, 22, 23, 58))
        self.assertFalse(result)

    def test_can_user_choose_room_when_after_user_start_time(self):
        self.active.rooming_start = time_point(2016, 12, 23, 0, 0)
        self.active.save()
        user_prefs = create_user_preferences(self.normal, self.active, payment_accepted=True,
                                             bonus_minutes=3)

        result = self.active.can_user_choose_room(user_prefs, time=time_point(2016, 12, 22, 23, 58))
        self.assertTrue(result)


class HomePageTestCase(TestCase):
    def test_full_registration_is_rendered_as_suspended(self):
        zosia = create_zosia(active=True, registration_limit=1)
        user = create_user(0)
        create_user_preferences(user, zosia)

        response = self.client.get(reverse('index'))

        self.assertFalse(response.context_data.registration_open)
        self.assertTrue(response.context_data.registration_full)


class TransportTestCase(TestCase):
    def setUp(self):
        super().setUp()
        self.normal = create_user(0)
        self.zosia = create_zosia()

        self.transport1 = create_transport(self.zosia, capacity=0)
        self.transport2 = create_transport(self.zosia, capacity=1)
        self.transport3 = create_transport(self.zosia, capacity=2)

    def test_find_transport_with_free_places_when_all_empty(self):
        transport = Transport.objects.find_with_free_places(self.zosia)
        self.assertEqual(transport.count(), 2)

    def test_find_transport_with_free_places_when_transport_chosen_and_full(self):
        create_user_preferences(self.normal, self.zosia, transport=self.transport2)
        transport = Transport.objects.find_with_free_places(self.zosia)
        self.assertEqual(transport.count(), 1)

    def test_find_transport_with_free_places_when_transport_chosen_and_not_full(self):
        create_user_preferences(self.normal, self.zosia, transport=self.transport3)
        transport = Transport.objects.find_with_free_places(self.zosia)
        self.assertEqual(transport.count(), 2)

    def test_find_available_when_all_empty(self):
        transport = Transport.objects.find_available(self.zosia)
        self.assertEqual(transport.count(), 2)

    def test_find_available_when_transport_chosen_and_full(self):
        create_user_preferences(self.normal, self.zosia, transport=self.transport2)
        transport = Transport.objects.find_available(self.zosia)
        self.assertEqual(transport.count(), 1)

    def test_find_available_when_transport_chosen_and_not_full(self):
        create_user_preferences(self.normal, self.zosia, transport=self.transport3)
        transport = Transport.objects.find_available(self.zosia)
        self.assertEqual(transport.count(), 2)

    def test_find_available_when_passenger_and_transport_chosen_and_full(self):
        user_prefs = create_user_preferences(self.normal, self.zosia, transport=self.transport2)
        transport = Transport.objects.find_available(self.zosia, passenger=user_prefs)
        self.assertEqual(transport.count(), 2)

    def test_find_available_when_passenger_and_transport_chosen_and_not_full(self):
        user_prefs = create_user_preferences(self.normal, self.zosia, transport=self.transport3)
        transport = Transport.objects.find_available(self.zosia, passenger=user_prefs)
        self.assertEqual(transport.count(), 2)


class ZosiaTimeViewTestCase(TestCase):
    def test_zosiatime_is_available(self):
        response = self.client.get('/zosiatime/')
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, 'data-timer-data-url')
        self.assertContains(response, reverse('lectures_schedule_timer'))
