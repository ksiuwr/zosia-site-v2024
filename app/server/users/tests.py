import re

from django.contrib.admin.models import ADDITION, LogEntry
from django.contrib.sessions.models import Session
from django.test import Client, TestCase
from django.urls import reverse

from .actions import DeletePersonalData
from .forms import UserPreferencesForm
from .models import Organization, User, UserPreferences
from .templates import AdminDeletePersonalData
from server.blog.models import BlogPost
from server.boardgames.models import Boardgame, Vote
from server.conferences.models import Place, Transport, Zosia
from server.lectures.models import Lecture, Schedule
from server.organizers.models import OrganizerContact
from server.rooms.models import Room, RoomLock
from server.rooms.test_helpers import create_room
from server.utils.constants import LectureInternals, LectureRecordingInternals, UserInternals
from server.utils.sites import use_site
from server.utils.test_helpers import PRICE_BASE, PRICE_BREAKFAST, PRICE_DINNER, PRICE_FULL, LONG_USER_INDEX, \
    TestCaseWithReact, create_organization, create_transport, create_user, \
    create_user_preferences, create_zosia, login_as_user
from server.utils.time_manager import timedelta_since_now


class UserPreferencesTestCase(TestCase):
    def setUp(self):
        super().setUp()
        self.normal = create_user(0)
        self.staff = create_user(1, is_staff=True)
        self.zosia = create_zosia(active=True)
        self.long_user = create_user(LONG_USER_INDEX)


class UserPreferencesModelTestCase(UserPreferencesTestCase):
    def make_user_prefs(self, **override):
        defaults = {
            'user': self.normal,
            'zosia': self.zosia,
            'contact': 'fb: me',
            'shirt_size': 'S',
            'shirt_type': 'm',
            'terms_accepted': True
        }
        defaults.update(**override)
        return UserPreferences(**defaults)

    def test_price_base(self):
        user_prefs = self.make_user_prefs(
            accommodation_day_1=False,
            dinner_day_1=False,
            breakfast_day_2=False,
            accommodation_day_2=False,
            dinner_day_2=False,
            breakfast_day_3=False,
            accommodation_day_3=False,
            dinner_day_3=False,
            breakfast_day_4=False,
        )

        self.assertEqual(user_prefs.price, PRICE_BASE)

    def test_price_whole_day(self):
        user_prefs = self.make_user_prefs(
            accommodation_day_1=True,
            dinner_day_1=True,
            breakfast_day_2=True,
            accommodation_day_2=False,
            dinner_day_2=False,
            breakfast_day_3=False,
            accommodation_day_3=False,
            dinner_day_3=False,
            breakfast_day_4=False,
        )

        self.assertEqual(user_prefs.price,
                         PRICE_BASE + PRICE_FULL)

    def test_price_day_with_dinner(self):
        user_prefs = self.make_user_prefs(
            accommodation_day_1=True,
            dinner_day_1=True,
            breakfast_day_2=False,
            accommodation_day_2=False,
            dinner_day_2=False,
            breakfast_day_3=False,
            accommodation_day_3=False,
            dinner_day_3=False,
            breakfast_day_4=False,
        )

        self.assertEqual(user_prefs.price,
                         PRICE_BASE + PRICE_DINNER)

    def test_price_day_with_breakfast(self):
        user_prefs = self.make_user_prefs(
            accommodation_day_1=True,
            dinner_day_1=False,
            breakfast_day_2=True,
            accommodation_day_2=False,
            dinner_day_2=False,
            breakfast_day_3=False,
            accommodation_day_3=False,
            dinner_day_3=False,
            breakfast_day_4=False,
        )

        self.assertEqual(user_prefs.price,
                         PRICE_BASE + PRICE_BREAKFAST)

    def test_full_price(self):
        user_prefs = self.make_user_prefs(
            accommodation_day_1=True,
            dinner_day_1=True,
            breakfast_day_2=True,
            accommodation_day_2=True,
            dinner_day_2=True,
            breakfast_day_3=True,
            accommodation_day_3=True,
            dinner_day_3=True,
            breakfast_day_4=True,
        )

        self.assertEqual(user_prefs.price,
                         PRICE_BASE + 3 * PRICE_FULL)

    def test_price_with_everything_except_last_breakfast(self):
        user_prefs = self.make_user_prefs(
            accommodation_day_1=True,
            dinner_day_1=True,
            breakfast_day_2=True,
            accommodation_day_2=True,
            dinner_day_2=True,
            breakfast_day_3=True,
            accommodation_day_3=True,
            dinner_day_3=True,
            breakfast_day_4=False,
        )

        self.assertEqual(user_prefs.price,
                         PRICE_BASE + 2 * PRICE_FULL + PRICE_DINNER)

    def test_price_for_whole_second_day(self):
        user_prefs = self.make_user_prefs(
            accommodation_day_1=False,
            dinner_day_1=False,
            breakfast_day_2=False,
            accommodation_day_2=True,
            dinner_day_2=True,
            breakfast_day_3=True,
            accommodation_day_3=False,
            dinner_day_3=False,
            breakfast_day_4=False,
        )

        self.assertEqual(user_prefs.price,
                         PRICE_BASE + PRICE_FULL)

    def test_toggle_payment_accepted(self):
        user_prefs = self.make_user_prefs(payment_accepted=True)
        self.assertTrue(user_prefs.payment_accepted)
        user_prefs.toggle_payment_accepted()
        self.assertFalse(user_prefs.payment_accepted)
        user_prefs.toggle_payment_accepted()
        self.assertTrue(user_prefs.payment_accepted)

    def test_tansfer_title_shorter_than_130_characters(self):
        user_prefs = self.make_user_prefs(
            accommodation_day_1=False,
            dinner_day_1=False,
            breakfast_day_2=False,
            accommodation_day_2=True,
            dinner_day_2=True,
            breakfast_day_3=True,
            accommodation_day_3=False,
            dinner_day_3=False,
            breakfast_day_4=False,
            user=self.long_user
        )

        self.assertLess(len(user_prefs.transfer_title), 130)

    def test_transfer_title_different_for_different_preferences(self):
        user_prefs_1 = self.make_user_prefs(
            accommodation_day_1=False,
            dinner_day_1=False,
            breakfast_day_2=False,
            accommodation_day_2=True,
            dinner_day_2=True,
            breakfast_day_3=True,
            accommodation_day_3=False,
            dinner_day_3=False,
            breakfast_day_4=False,
        )

        user_prefs_2 = self.make_user_prefs(
            accommodation_day_1=True,
            dinner_day_1=False,
            breakfast_day_2=False,
            accommodation_day_2=True,
            dinner_day_2=True,
            breakfast_day_3=True,
            accommodation_day_3=True,
            dinner_day_3=False,
            breakfast_day_4=True,
        )

        self.assertNotEqual(user_prefs_1.transfer_title, user_prefs_2.transfer_title)

    def test_transfer_title_is_the_same_for_the_same_preferences(self):
        user_prefs_1 = self.make_user_prefs(
            accommodation_day_1=False,
            dinner_day_1=False,
            breakfast_day_2=False,
            accommodation_day_2=True,
            dinner_day_2=True,
            breakfast_day_3=True,
            accommodation_day_3=False,
            dinner_day_3=False,
            breakfast_day_4=False,
        )

        user_prefs_2 = self.make_user_prefs(
            accommodation_day_1=False,
            dinner_day_1=False,
            breakfast_day_2=False,
            accommodation_day_2=True,
            dinner_day_2=True,
            breakfast_day_3=True,
            accommodation_day_3=False,
            dinner_day_3=False,
            breakfast_day_4=False,
        )

        self.assertEqual(user_prefs_1.transfer_title, user_prefs_2.transfer_title)


class UserPreferencesFormTestCase(TestCase):
    def setUp(self):
        super().setUp()
        self.normal = create_user(0)

    def make_user_prefs_form(self, **override):
        defaults = {
            'contact': 'fb: me',
            'shirt_size': 'S',
            'shirt_type': 'm',
            'terms_accepted': True
        }
        defaults.update(**override)
        return UserPreferencesForm(self.normal, defaults)

    def test_basic_form(self):
        form = self.make_user_prefs_form()
        self.assertTrue(form.is_valid())

    def test_accommodation_must_be_chosen_for_dinner_or_breakfast(self):
        form = self.make_user_prefs_form(breakfast_day_2=True, accommodation_day_2=False)
        self.assertFalse(form.is_valid())


class UserPreferencesIndexTestCase(UserPreferencesTestCase):
    def setUp(self):
        super().setUp()
        self.url = reverse('user_preferences_index')

    def test_index_get_no_user(self):
        response = self.client.get(self.url, follow=True)
        self.assertEqual(response.status_code, 200)
        self.assertRedirects(response, '/admin/login/?next=/accounts/preferences/')

    def test_index_get_normal_user(self):
        login_as_user(self.normal, self.client)
        response = self.client.get(self.url, follow=True)
        self.assertEqual(response.status_code, 200)
        self.assertRedirects(response, '/admin/login/?next=/accounts/preferences/')

    def test_index_get_staff_user(self):
        login_as_user(self.staff, self.client)
        response = self.client.get(self.url, follow=True)
        self.assertEqual(response.status_code, 200)

    def test_index_get_staff_user_multiple_zosias(self):
        another_zosia = create_zosia()
        create_user_preferences(self.normal, another_zosia)
        create_user_preferences(self.normal, self.zosia)
        create_user_preferences(self.staff, self.zosia)
        login_as_user(self.staff, self.client)
        response = self.client.get(self.url, follow=True)
        self.assertEqual(response.status_code, 200)


class UserPreferencesAdminEditTestCase(UserPreferencesTestCase):
    def setUp(self):
        super().setUp()
        self.user_prefs = create_user_preferences(self.normal, self.zosia)
        self.url = reverse('user_preferences_admin_edit')

    def test_post_no_user(self):
        response = self.client.get(self.url, follow=True)
        self.assertEqual(response.status_code, 200)
        self.assertRedirects(response, '/admin/login/?next=/accounts/preferences/admin/')

    def test_post_normal_user(self):
        login_as_user(self.normal, self.client)
        response = self.client.post(self.url,
                                    {'key': self.user_prefs.pk},
                                    follow=True)
        self.assertEqual(response.status_code, 200)
        self.assertRedirects(response, '/admin/login/?next=/accounts/preferences/admin/')

    def test_post_staff_user_can_change_payment_status(self):
        login_as_user(self.staff, self.client)
        response = self.client.post(self.url,
                                    {'key': self.user_prefs.pk,
                                     'command': 'toggle_payment_accepted'},
                                    follow=True)
        self.assertEqual(response.status_code, 200)
        self.assertTrue(
            UserPreferences.objects.filter(pk=self.user_prefs.pk).first().payment_accepted)

    def test_post_staff_user_can_bonus(self):
        login_as_user(self.staff, self.client)
        response = self.client.post(self.url,
                                    {'key': self.user_prefs.pk,
                                     'command': 'change_bonus',
                                     'bonus': 20},
                                    follow=True)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            UserPreferences.objects.filter(pk=self.user_prefs.pk).first().bonus_minutes, 20)


class UserPreferencesEditTestCase(UserPreferencesTestCase):
    def setUp(self):
        super().setUp()
        self.user_prefs = create_user_preferences(self.normal, self.zosia, contact='foo')
        self.url = reverse('user_preferences_edit', kwargs={'pk': self.user_prefs.pk})

    def test_get_no_user(self):
        response = self.client.get(self.url, follow=True)
        self.assertEqual(response.status_code, 200)
        self.assertRedirects(response, '/admin/login/?next=' + self.url)

    def test_get_normal_user(self):
        login_as_user(self.normal, self.client)
        response = self.client.get(self.url, follow=True)
        self.assertEqual(response.status_code, 200)
        self.assertRedirects(response, '/admin/login/?next=' + self.url)

    def test_get_staff_user_returns_admin_form(self):
        login_as_user(self.staff, self.client)
        response = self.client.get(self.url, follow=True)
        self.assertEqual(response.status_code, 200)

    def test_post_staff_user_will_change_prefs(self):
        login_as_user(self.staff, self.client)
        response = self.client.post(self.url,
                                    data={
                                        'shirt_size': 'XXL',
                                        'shirt_type': 'm',
                                        'contact': self.user_prefs.contact,
                                        'bonus_minutes': 0,
                                        'terms_accepted': True,
                                        'transport_baggage': False
                                    },
                                    follow=True)
        self.assertEqual(response.status_code, 200)
        prefs = UserPreferences.objects.filter(pk=self.user_prefs.pk).first()
        self.assertEqual(prefs.shirt_size, 'XXL')
        self.assertEqual(prefs.shirt_type, 'm')


class RegisterViewTestCase(TestCase):
    def setUp(self):
        super().setUp()
        self.normal = create_user(0)
        self.privileged = create_user(1, person_type=UserInternals.PERSON_PRIVILEGED)
        self.organizer = create_user(2, person_type=UserInternals.PERSON_ORGANIZER)
        self.zosia = create_zosia(active=True)
        self.url = reverse('user_zosia_register')

    def test_get_no_user(self):
        response = self.client.get(self.url, follow=True)
        self.assertEqual(response.status_code, 200)
        self.assertRedirects(response, '/accounts/login/?next={}'.format(self.url))

    def test_get_regular_user_not_registered(self):
        login_as_user(self.normal, self.client)
        response = self.client.get(self.url, follow=True)
        self.assertEqual(response.status_code, 200)

    def test_get_privileged_user_not_registered(self):
        login_as_user(self.privileged, self.client)
        self.zosia.early_registration_start = timedelta_since_now(hours=-1)
        self.zosia.registration_start = timedelta_since_now(hours=1)
        self.zosia.save()
        response = self.client.get(self.url, follow=True)
        self.assertEqual(response.status_code, 200)

    def test_get_organizer_user_can_register_during_early_registration(self):
        login_as_user(self.organizer, self.client)
        self.zosia.early_registration_start = timedelta_since_now(hours=-1)
        self.zosia.registration_start = timedelta_since_now(hours=1)
        self.zosia.save()
        response = self.client.get(self.url, follow=True)
        self.assertEqual(response.status_code, 200)

    def test_get_privileged_user_not_registered_during_suspended_registration(self):
        login_as_user(self.privileged, self.client)
        self.zosia.registration_suspended = True
        self.zosia.save()
        response = self.client.get(self.url, follow=True)
        self.assertEqual(response.status_code, 200)

    def test_get_regular_user_before_registration(self):
        login_as_user(self.normal, self.client)
        self.zosia.registration_start = timedelta_since_now(hours=1)
        self.zosia.save()
        response = self.client.get(self.url, follow=True)
        self.assertEqual(response.status_code, 200)
        self.assertRedirects(response, reverse('index'))

    def test_get_regular_user_before_early_registration(self):
        login_as_user(self.normal, self.client)
        self.zosia.early_registration_start = timedelta_since_now(hours=-1)
        self.zosia.registration_start = timedelta_since_now(hours=1)
        self.zosia.save()
        response = self.client.get(self.url, follow=True)
        self.assertEqual(response.status_code, 200)
        self.assertRedirects(response, reverse('index'))

    def test_get_privileged_user_before_early_registration(self):
        login_as_user(self.privileged, self.client)
        self.zosia.early_registration_start = timedelta_since_now(hours=1)
        self.zosia.registration_start = timedelta_since_now(hours=2)
        self.zosia.save()
        response = self.client.get(self.url, follow=True)
        self.assertEqual(response.status_code, 200)
        self.assertRedirects(response, reverse('index'))

    def test_get_organizer_user_cannot_register_before_early_registration(self):
        login_as_user(self.organizer, self.client)
        self.zosia.early_registration_start = timedelta_since_now(hours=1)
        self.zosia.registration_start = timedelta_since_now(hours=2)
        self.zosia.save()
        response = self.client.get(self.url, follow=True)
        self.assertEqual(response.status_code, 200)
        self.assertRedirects(response, reverse('index'))

    def test_get_regular_user_after_registration_without_prefs(self):
        login_as_user(self.normal, self.client)
        self.zosia.registration_end = timedelta_since_now(hours=-1)
        self.zosia.save()
        response = self.client.get(self.url, follow=True)
        self.assertEqual(response.status_code, 200)
        self.assertRedirects(response, reverse('index'))

    def test_get_regular_user_after_registration_with_prefs(self):
        login_as_user(self.normal, self.client)
        self.zosia.registration_end = timedelta_since_now(hours=-1)
        self.zosia.save()
        org = create_organization(name='ksi', accepted=True)
        user_prefs = create_user_preferences(self.normal, self.zosia, organization=org)
        response = self.client.get(self.url, follow=True)
        self.assertEqual(response.status_code, 200)

    def test_get_regular_user_already_registered(self):
        login_as_user(self.normal, self.client)
        org = create_organization(name='ksi', accepted=True)
        user_prefs = create_user_preferences(self.normal, self.zosia, organization=org)
        response = self.client.get(self.url, follow=True)
        self.assertEqual(response.status_code, 200)

    def test_get_regular_user_already_registered_during_suspended_registration(self):
        login_as_user(self.normal, self.client)
        self.zosia.registration_suspended = True
        self.zosia.save()
        org = create_organization(name='ksi', accepted=True)
        user_prefs = create_user_preferences(self.normal, self.zosia, organization=org)
        response = self.client.get(self.url, follow=True)
        self.assertEqual(response.status_code, 200)

    def test_post_user_not_registered_empty_data(self):
        self.assertEqual(UserPreferences.objects.filter(user=self.normal).count(), 0)
        login_as_user(self.normal, self.client)
        response = self.client.post(self.url,
                                    data={},
                                    follow=True)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(UserPreferences.objects.filter(user=self.normal).count(), 0)

    def test_post_user_not_registered_with_data(self):
        self.assertEqual(UserPreferences.objects.filter(user=self.normal).count(), 0)
        login_as_user(self.normal, self.client)
        response = self.client.post(self.url,
                                    data={
                                        'contact': 'fb: me',
                                        'shirt_size': 'S',
                                        'shirt_type': 'm',
                                        'terms_accepted': True
                                    },
                                    follow=True)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(UserPreferences.objects.filter(user=self.normal).count(), 1)

    def test_post_user_already_registered(self):
        create_user_preferences(self.normal, self.zosia)
        self.assertEqual(UserPreferences.objects.filter(user=self.normal).count(), 1)
        login_as_user(self.normal, self.client)
        response = self.client.post(self.url,
                                    data={
                                        'contact': 'fb: me',
                                        'shirt_size': 'S',
                                        'shirt_type': 'm',
                                        'terms_accepted': True
                                    },
                                    follow=True)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(UserPreferences.objects.filter(user=self.normal).count(), 1)

    def test_post_user_cannot_change_accommodation_after_paid(self):
        create_user_preferences(self.normal, self.zosia, accommodation_day_1=False, shirt_size='M',
                                payment_accepted=True)
        self.assertEqual(UserPreferences.objects.filter(user=self.normal).count(), 1)
        login_as_user(self.normal, self.client)
        response = self.client.post(self.url,
                                    data={
                                        'accommodation_day_1': True,
                                        'shirt_size': 'M',
                                        'shirt_type': 'm',
                                        'contact': 'fb: me',
                                        'terms_accepted': True
                                    },
                                    follow=True)
        self.assertEqual(response.status_code, 200)
        prefs = UserPreferences.objects.filter(user=self.normal).first()
        self.assertFalse(prefs.accommodation_day_1)
        self.assertEqual(prefs.shirt_size, 'M')


class DeletePersonalDataTestCase(TestCaseWithReact):
    def setUp(self):
        super().setUp()
        # Ended a week ago
        self.zosia = create_zosia(active=True, start_date=timedelta_since_now(days=-10).date())
        self.transport = create_transport(self.zosia, capacity=10)
        self.normal = create_user(0)
        self.staff = create_user(1, is_staff=True, person_type=UserInternals.PERSON_ORGANIZER)
        self.superuser = create_user(2, is_staff=True, is_superuser=True)
        self.url = reverse('delete_personal_data')

        create_user_preferences(self.normal, self.zosia, contact='123 456 789',
                                student_number='123456', transport=self.transport)
        create_user_preferences(self.superuser, self.zosia, contact='987 654 321')

        self.room = create_room(1, capacity=2)
        self.room.join(self.superuser)
        self.room.set_lock(self.superuser)

        self.accepted = create_organization("Accepted", user=self.normal, accepted=True)
        create_organization("Proposed", user=self.normal)

        OrganizerContact.objects.create(user=self.staff, zosia=self.zosia,
                                        phone_number='123456789')

        boardgame = Boardgame.objects.create(name="Go", user=self.normal,
                                             url="https://boardgamegeek.com/boardgame/188")
        Vote.objects.create(user=self.superuser, boardgame=boardgame)

        for author in (self.normal, self.superuser):
            Lecture.objects.create(
                zosia=self.zosia, title="foo", abstract="bar", duration=15,
                lecture_type=LectureInternals.TYPE_LECTURE, author=author,
                recording_preferences=LectureRecordingInternals.TYPE_DO_NOT_RECORD
            )
        Schedule.objects.create(zosia=self.zosia, schedule_data=[{"events": [
            {"title": "foo", "lecturer": "Paul McCartney"}]}])

        self.staff_post = BlogPost.objects.create(title="foo", content="bar", author=self.staff)
        self.superuser_post = BlogPost.objects.create(title="foo", content="bar",
                                                      author=self.superuser)

        LogEntry.objects.log_action(self.superuser.pk, None, None, "Paul preferences", ADDITION)

    def test_deletes_personal_data(self):
        DeletePersonalData().call()

        self.assertQuerySetEqual(User.objects.all(), [self.superuser])
        for model in (UserPreferences, RoomLock, OrganizerContact, Boardgame, Vote, Lecture,
                      Schedule, LogEntry):
            self.assertFalse(model.objects.exists(), model.__name__)

        self.room.refresh_from_db()
        self.assertEqual(self.room.members_count, 0)
        self.assertIsNone(self.room.lock)

        self.assertQuerySetEqual(Organization.objects.all(), [self.accepted])
        self.accepted.refresh_from_db()
        self.assertIsNone(self.accepted.user)

    def test_keeps_conference_data(self):
        DeletePersonalData().call()

        self.assertQuerySetEqual(Zosia.objects.all(), [self.zosia])
        self.assertQuerySetEqual(Transport.objects.all(), [self.transport])
        self.assertQuerySetEqual(Room.objects.all(), [self.room])
        self.assertTrue(Place.objects.exists())

        self.staff_post.refresh_from_db()
        self.superuser_post.refresh_from_db()
        self.assertIsNone(self.staff_post.author)
        self.assertEqual(self.superuser_post.author, self.superuser)

    def test_get_no_user(self):
        response = self.client.get(self.url, follow=True)
        self.assertRedirects(response, f'/accounts/login/?next={self.url}')

    def test_get_staff_user(self):
        login_as_user(self.staff, self.client)
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 403)

    def test_get_superuser(self):
        login_as_user(self.superuser, self.client)
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 200)
        self.assertReactTemplateUsed(response, AdminDeletePersonalData)
        self.assertFalse(response.context_data.conference_not_over)

        counts = dict(response.context_data.to_delete)
        self.assertEqual(counts["User accounts (all except superusers)"], 2)
        self.assertEqual(counts["Lectures"], 2)

    def test_get_superuser_conference_not_over(self):
        self.zosia.start_date = timedelta_since_now(days=-2).date()
        self.zosia.save()

        login_as_user(self.superuser, self.client)
        response = self.client.get(self.url)
        self.assertTrue(response.context_data.conference_not_over)

    def test_post_staff_user(self):
        login_as_user(self.staff, self.client)
        response = self.client.post(self.url, {'confirmation': 'ZOSIA'})
        self.assertEqual(response.status_code, 403)
        self.assertEqual(User.objects.count(), 3)

    def test_post_superuser_wrong_confirmation(self):
        login_as_user(self.superuser, self.client)
        response = self.client.post(self.url, {'confirmation': 'zosia'})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(User.objects.count(), 3)
        self.assertEqual(UserPreferences.objects.count(), 2)

    def test_post_superuser(self):
        login_as_user(self.normal, Client())
        login_as_user(self.superuser, self.client)

        response = self.client.post(self.url, {'confirmation': 'ZOSIA'}, follow=True)
        self.assertRedirects(response, self.url)
        self.assertQuerySetEqual(User.objects.all(), [self.superuser])
        # Only the session of the superuser who deleted the data is left
        self.assertQuerySetEqual(Session.objects.values_list('session_key', flat=True),
                                 [self.client.session.session_key])


class DeletePersonalDataSitesTestCase(TestCase):
    databases = {"default", "leosia"}

    def test_deletes_only_current_site_data(self):
        User.objects.db_manager("leosia").create_user(
            email="leosia@example.com", first_name="Leo", last_name="Sia", password="password")
        zosia_user = create_user(0)

        with use_site("leosia"):
            DeletePersonalData().call()

        self.assertFalse(User.objects.using("leosia").exists())
        self.assertQuerySetEqual(User.objects.all(), [zosia_user])
