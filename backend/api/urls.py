from django.urls import path
from api.views import *
from api.api import *
from knox import views as knox_views

urlpatterns = [
    path('category/<int:pk>/', category_detail),
    path('category/', category_list),
    path('country/', country_list),
    path('country/<int:pk>', country_detail),
    path('actor/', actor_list),
    path('actor/<int:pk>', actor_detail),
    path('user/', user_list),
    path('user/<int:pk>', user_detail),
    path('user_profile/', user_profile_list),
    path('user_profile/<int:pk>', user_profile_detail),
    path('film/', film_list),
    path('film/<int:pk>', film_detail),
    path('film_episode/', film_episode_list),
    path('film_episode/<int:pk>', film_episode_detail),
    path('rate_film/', rate_film_list),
    path('rate_film/<int:pk>', rate_film_detail),
    path('rate_film_episode/', rate_film_episode_list),
    path('rate_film_episode/<int:pk>', rate_film_episode_detail),
    path('comment/', comment_list),
    path('comment/<int:pk>', comment_detail),
    path('comment_film/', comment_film_list),
    path('comment_film/<int:pk>', comment_film_detail),
    path('comment_film_episode/', comment_film_episode_list),
    path('comment_film_episode/<int:pk>', comment_film_episode_detail),
    path('history/', history_list),
    path('history/<int:pk>', history_detail),
    path('tracking/', tracking_list),
    path('tracking/<int:pk>', tracking_detail),
    path('play_list/', play_list_list),
    path('play_list/<int:pk>', play_list_detail),
    path('play_list_episode/', play_list_episode_list),
    path('play_list_episode/<int:pk>', play_list_episode_detail),
    path('register/', RegistrationAPI.as_view()),
    path('login/', LoginAPI.as_view()),
    path('userview/', UserAPI.as_view()),
]   