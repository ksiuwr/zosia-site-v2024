from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='blog_index'),
    path('create', views.create, name='blog_create'),
    path('list', views.list, name='blog_list'),
    path('<int:pk>/edit/', views.edit, name='blog_edit'),
]
