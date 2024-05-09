from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='questions_index'),
    path('all/', views.index_for_staff, name='questions_index_staff'),
    path('add/', views.update, name='questions_add'),
    path('<int:question_id>/', views.update, name='questions_edit'),
    path('<int:question_id>/delete/', views.delete, name='questions_delete'),
]
