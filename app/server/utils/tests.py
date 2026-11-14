from django.db import transaction
from django.http import HttpResponse
from django.test import RequestFactory, SimpleTestCase, TestCase, override_settings

from server.users.models import User
from server.utils.sites import SiteMiddleware, get_site_code, site_atomic, site_for_host, use_site

SITE_HOSTS = ["zosia.org", "www.zosia.org", "leosia.org", "www.leosia.org"]


class SiteForHostTestCase(SimpleTestCase):
    def test_site_domains(self):
        self.assertEqual(site_for_host("zosia.org"), "zosia")
        self.assertEqual(site_for_host("leosia.org"), "leosia")

    def test_subdomains_and_port(self):
        self.assertEqual(site_for_host("www.leosia.org"), "leosia")
        self.assertEqual(site_for_host("staging.zosia.org"), "zosia")
        self.assertEqual(site_for_host("leosia.localhost:8000"), "leosia")
        self.assertEqual(site_for_host("LEOSIA.ORG"), "leosia")

    def test_unknown_host_uses_default_site(self):
        self.assertEqual(site_for_host("localhost:8000"), "zosia")
        self.assertEqual(site_for_host("notleosia.org"), "zosia")


@override_settings(ALLOWED_HOSTS=SITE_HOSTS)
class SiteMiddlewareTestCase(TestCase):
    databases = {"default", "leosia"}

    def setUp(self):
        User.objects.db_manager("leosia").create_user(
            email="leosia@example.com", first_name="Leo", last_name="Sia", password="password")

    def get(self, host, view):
        request = RequestFactory().get("/", HTTP_HOST=host)
        return SiteMiddleware(view)(request)

    def test_site_is_set_only_during_request(self):
        def view(request):
            return HttpResponse(get_site_code())

        self.assertEqual(self.get("leosia.org", view).content, b"leosia")
        self.assertEqual(get_site_code(), "zosia")

    def test_queries_use_site_database(self):
        def view(request):
            exists = User.objects.filter(email="leosia@example.com").exists()
            return HttpResponse(str(exists))

        self.assertEqual(self.get("www.leosia.org", view).content, b"True")
        self.assertEqual(self.get("zosia.org", view).content, b"False")

    def test_site_atomic_uses_site_database(self):
        default = transaction.get_connection("default")
        leosia = transaction.get_connection("leosia")

        # TestCase already runs in a transaction, so a nested atomic block adds a savepoint
        @site_atomic
        def savepoints():
            return len(default.savepoint_ids), len(leosia.savepoint_ids)

        before_default, before_leosia = len(default.savepoint_ids), len(leosia.savepoint_ids)

        with use_site("leosia"):
            self.assertEqual(savepoints(), (before_default, before_leosia + 1))

        self.assertEqual(savepoints(), (before_default + 1, before_leosia))
