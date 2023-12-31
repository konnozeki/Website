from django.urls import path
from front.views import *


urlpatterns = [
    path("", front),
    path("home", front),
    path("watch/<slug:film_slug>", front),
    path("login", front),
    path("register", front),
    path("movies", front),
    path("search", front),
    path("actor/<slug:actor_slug>" , front),
    path("user/profile" , front),
    path("user/playlist", front),
    path("admin/movie/<int:film_id>/episodes/<int:episode_id>" , front),
    path("admin" , front),
    path("admin/movie/add" , front),
    path("playlist/<slug:playlist_slug>", front),
    path("history" , front),
    path("Admin/AddEspisode" , front),
    path("admin/movie" , front),
    path("admin/user", front),
    path("admin/user/detail/<str:username>", front),
    path("Admin/Profile", front),
    path("admin/movie/<int:id>", front),
    path("admin/movie/<int:id>/change", front),
    path("admin/movie/<int:id>/add_episode", front),
    path("admin/actor" , front),
    path("admin/actor/add" , front),
    path("admin/actor/<int:actor_id>" , front),
    path("admin/category" , front),

]
