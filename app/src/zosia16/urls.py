"""zosia16 URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  re_path(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  re_path(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, re_path
    2. Add a URL to urlpatterns:  re_path(r'^blog/', include('blog.urls'))
"""
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path
from django.urls import include, re_path
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework import permissions

schema_view = get_schema_view(
    openapi.Info(title="ZOSIA API", default_version='v1', description="API for ZOSIA site"),
    public=True, permission_classes=[permissions.AllowAny]
)

site_urls = [
    re_path(r'^admin/', admin.site.urls),
    path('', include('conferences.urls')),
    path('accounts/', include('users.urls')),
    path('rooms/', include('rooms.urls')),
    path('blog/', include('blog.urls')),
    path('sponsors/', include('sponsors.urls')),
    path('lectures/', include('lectures.urls')),
    path('questions/', include('questions.urls')),
    path('boardgames/', include('boardgames.urls')),
    path('organizers/', include('organizers.urls')),
]

api_urls = [
    path('api/v1/rooms/', include('rooms.api.v1.urls')),
    path('api/v2/rooms/', include('rooms.api.v2.urls')),
    path('api/v1/users/', include('users.api.urls')),
]

swagger_urls = [
    re_path(r'^swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui')
]

urlpatterns = site_urls + api_urls + swagger_urls + static(settings.STATIC_URL,
                                                           document_root=settings.STATIC_ROOT)
