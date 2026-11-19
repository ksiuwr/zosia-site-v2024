from django.contrib.admin.models import LogEntry
from django.contrib.sessions.models import Session

from server.boardgames.models import Boardgame
from server.lectures.models import Lecture, Schedule
from server.organizers.models import OrganizerContact
from server.rooms.models import RoomLock, UserRoom
from server.users.models import Organization, User, UserPreferences
from server.utils.sites import site_atomic


class DeletePersonalData:
    """
    Deletes participants' personal data, which according to the privacy policy we keep until
    a month after the conference. Only the current site's database is affected.

    What describes the conference itself stays: conferences, places, transport, rooms, sponsors,
    blog posts, Q&A and accepted organizations. Superuser accounts stay too, so that someone can
    still log in, but their registrations are deleted like everyone else's.
    """

    def __init__(self, keep_session_key=None):
        self.keep_session_key = keep_session_key

    def targets(self):
        # Deleted in this order, boardgames have to go before their users (PROTECT)
        return [
            ("Registrations (preferences, contacts, student numbers, payments)",
             UserPreferences.objects.all()),
            ("Room memberships", UserRoom.objects.all()),
            ("Room locks", RoomLock.objects.all()),
            ("Organizers' phone numbers", OrganizerContact.objects.all()),
            ("Boardgames (with their votes)", Boardgame.objects.all()),
            ("Lectures", Lecture.objects.all()),
            ("Schedules (they contain lecturers' names)", Schedule.objects.all()),
            ("Organizations proposed by users and not accepted",
             Organization.objects.filter(accepted=False)),
            ("User accounts (all except superusers)", User.objects.filter(is_superuser=False)),
            ("Sessions (everyone except you gets logged out)",
             Session.objects.exclude(session_key=self.keep_session_key)),
            ("Admin log entries", LogEntry.objects.all()),
        ]

    @site_atomic
    def call(self):
        for _, queryset in self.targets():
            queryset.delete()

        # Accepted organizations stay, just not who proposed them
        Organization.objects.update(user=None)
