from django.contrib.auth.views import LogoutView
from django.urls import path
from django.urls import include, re_path

from . import views
from server.utils.views import anonymous_required

urlpatterns = [
    path('profile/', views.profile, name='accounts_profile'),
    path('signup/', anonymous_required(views.signup), name='accounts_signup'),
    path('edit/', views.account_edit, name='accounts_edit'),
    path('mail/', views.mail_to_all, name='mail_all'),
    re_path(
        r'^activate/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,40})/$',
        views.activate, name='accounts_activate'),
    path('login/', anonymous_required(views.ReactLoginView.as_view()), name='login'),
    path('logout/', LogoutView.as_view(next_page='index'), name='logout'),
    path('password_change/', views.ReactChangePasswordView.as_view(), name='password_change'),
    path('password_change/done/', views.ReactChangePasswordDoneView.as_view(), name='password_change_done'),
    path("password_reset/", views.ReactResetPasswordView.as_view(), name="password_reset"),
    path("password_reset/done/", views.ReactResetPasswordDoneView.as_view(), name="password_reset_done"),
    path("reset/<uidb64>/<token>/", views.ReactResetPasswordConfirmView.as_view(), name="password_reset_confirm"),
    path("reset/done/", views.ReactResetPasswordCompleteView.as_view(), name="password_reset_complete"),
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
    path('preferences/list/discounts', views.list_csv_preferences_with_discounts,
            name='list_csv_preferences_with_discounts'),
    path('lectures/list/all', views.list_csv_lectures,
            name='list_csv_lectures'),
    path('register/', views.register, name='user_zosia_register'),
]
