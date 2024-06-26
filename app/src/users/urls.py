from django.contrib.auth.views import LoginView
from django.urls import path
from django.urls import include, re_path

from users import views
from utils.views import anonymous_required

urlpatterns = [
    path('profile/', views.profile, name='accounts_profile'),
    path('signup/', anonymous_required(views.signup), name='accounts_signup'),
    path('edit/', views.account_edit, name='accounts_edit'),
    path('mail/', views.mail_to_all, name='mail_all'),
    re_path(
        r'^activate/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,40})/$',
        views.activate, name='accounts_activate'),
    path('login/',
            anonymous_required(LoginView.as_view(template_name='registration/login.html')),
            name='login'),
    path('organizations/', views.organizations, name='organizations'),
    path('organizations/accept/', views.toggle_organization, name='toggle_organization'),
    path('organizations/add/', views.update_organization, name='organization_add'),
    path('organizations/<int:pk>/edit/', views.update_organization,
            name='organization_update'),
    path('preferences/', views.user_preferences_index, name='user_preferences_index'),
    path('preferences/admin/', views.user_preferences_admin_edit,
            name='user_preferences_admin_edit'),
    path('preferences/<int:pk>/edit', views.user_preferences_edit,
            name='user_preferences_edit'),
    path('preferences/list/all', views.list_csv_preferences_all,
            name='list_csv_preferences_all'),
    path('preferences/list/paid', views.list_csv_preferences_paid,
            name='list_csv_preferences_paid'),
    path('lectures/list/all', views.list_csv_lectures,
            name='list_csv_lectures'),
    path('register/', views.register, name='user_zosia_register'),
    path('', include('django.contrib.auth.urls')),
    # NOTE: it adds following URLs:
    # ^logout/$ [name='logout']
    # ^password_change/$ [name='password_change']
    # ^password_change/done/$ [name='password_change_done']
    # ^password_reset/$ [name='password_reset']
    # ^password_reset/done/$ [name='password_reset_done']
    # ^reset/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$
    #   [name='password_reset_confirm']
    # ^reset/done/$ [name='password_reset_complete']
]
