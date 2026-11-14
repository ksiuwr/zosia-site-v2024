"""
Serving several sites (ZOSIA, LEOSIA) from one deployment.

SiteMiddleware picks the site from the Host header of the request and SiteRouter
sends all queries to that site's database. Outside of requests (management
commands, shell) the site is settings.DEFAULT_SITE, set by the SITE env variable.
"""
from contextlib import contextmanager
from contextvars import ContextVar
from functools import wraps

from django.conf import settings
from django.db import transaction

_current_site = ContextVar("current_site", default=None)


def site_for_host(host):
    host = host.rsplit(":", 1)[0].lower()

    for code, site in settings.SITES.items():
        for domain in site["domains"]:
            if host == domain or host.endswith("." + domain):
                return code

    return settings.DEFAULT_SITE


def get_site_code():
    return _current_site.get() or settings.DEFAULT_SITE


def get_site():
    return settings.SITES[get_site_code()]


def get_site_database():
    return get_site()["database"]


@contextmanager
def use_site(code):
    token = _current_site.set(code)
    try:
        yield
    finally:
        _current_site.reset(token)


def site_atomic(func):
    """
    Like @transaction.atomic, but on the current site's database.
    Plain transaction.atomic doesn't ask the router and always uses "default".
    """
    @wraps(func)
    def wrapper(*args, **kwargs):
        with transaction.atomic(using=get_site_database()):
            return func(*args, **kwargs)

    return wrapper


class SiteMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        request.site_code = site_for_host(request.get_host())
        with use_site(request.site_code):
            return self.get_response(request)


class SiteRouter:
    def db_for_read(self, model, **hints):
        return get_site_database()

    def db_for_write(self, model, **hints):
        return get_site_database()
