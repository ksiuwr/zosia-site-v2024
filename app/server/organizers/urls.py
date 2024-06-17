from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='organizers_index'),
    path('create', views.update, name='organizers_add'),
    path('<int:contact_id>/', views.update, name='organizers_edit'),
    path('<int:contact_id>/delete/', views.delete, name='organizers_delete'),
]
