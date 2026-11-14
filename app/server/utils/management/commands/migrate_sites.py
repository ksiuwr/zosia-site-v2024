from django.conf import settings
from django.core.management import call_command
from django.core.management.base import BaseCommand

from server.utils.sites import use_site


class Command(BaseCommand):
    help = "Runs migrate on the database of every site"

    def handle(self, *args, **options):
        for code, site in settings.SITES.items():
            self.stdout.write(f"Migrating {code} ({site['db_name']})")
            # Data migrations go through the router, so it has to point at the same database
            with use_site(code):
                call_command("migrate", database=site["database"], interactive=False)
