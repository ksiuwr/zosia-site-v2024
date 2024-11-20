from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='boardgames_index'),
    path('my/', views.my_boardgames, name='my_boardgames'),
    path('my/delete/', views.boardgame_delete, name='boardgames_delete'),
    path('create/', views.create, name='boardgames_create'),
    path('vote/', views.vote, name='boardgames_vote'),
    path('vote/edit/', views.vote_edit, name='vote_edit'),
    path('accept/', views.accept, name='boardgames_accept'),
    path('accept/toggle/', views.toggle_accepted, name='boardgames_toggle_accept')
]
