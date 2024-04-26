from django.urls import path

from sponsors import views

urlpatterns = [
    path('', views.index, name='sponsors_index'),
    path('create', views.update, name='sponsors_add'),
    path('<int:sponsor_id>/', views.update, name='sponsors_edit'),
    path('toggle_active/', views.toggle_active, name='sponsors_toggle_active'),
]
