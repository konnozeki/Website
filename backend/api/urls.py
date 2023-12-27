from django.urls import path
from api.views import *
from api.api import *
from knox import views as knox_views

urlpatterns = [
    path("generic/user/", ListUserGenericView.as_view()),
    path("country/", ListCountryView.as_view(), name="country"),
    path(
        "country/<slug:country_slug>/actors/",
        ListActorInCountryView.as_view(),
        name="country",
    ),
    path("register/", RegisterAPIView.as_view(), name="register"),
    path("logout/", knox_views.LogoutView.as_view(), name="logout"),
    path("api/logoutall", knox_views.LogoutAllView.as_view(), name="logout-all"),
    path("login/", LoginAPI.as_view(), name="login"),
    # Test xong GET và DELETE
    path("admin/user_list/", ListUserView.as_view()),
    path("admin/user_list/<int:pk>/", UpdateDeleteUserAdminView.as_view()),
    path("user/<int:pk>/", UpdateDeleteUserView.as_view()),
    path("admin/actor/", ListCreateActorView.as_view(), name="create-actor"),
    path(
        "admin/actor/<int:pk>/",
        UpdateDeleteActorView.as_view(),
        name="update-delete-actor",
    ),
    path("actor/", ListActorView.as_view(), name="list-actor"),
    path("actor/<slug:actor_slug>/", ActorInfoView.as_view(), name="actor-info"),
    path("admin/category/", ListCreateCategoryView.as_view()),
    path("admin/category/<int:pk>/", UpdateDeleteCategoryView.as_view()),
    path("category/", ListCategoryView.as_view()),
    path(
        "category/<slug:category_slug>/",
        CategoryInfoView.as_view(),
        name="category-info",
    ),
    path("admin/film/", ListCreateFilmView.as_view()),
    path("admin/film/<int:pk>/", UpdateDeleteFilmView.as_view()),
    path("film/", ListFilmView.as_view()),
    path("film/<slug:film_slug>/", FilmInfoView.as_view(), name="film-info"),
    path(
        "admin/film/<int:pk>/episode/",
        ListCreateFilmEpisodeView.as_view(),
        name="list-create-film-episodes",
    ),
    path(
        "admin/film/<int:film_pk>/episode/<int:pk>/",
        UpdateDeleteFilmEpisodeView.as_view(),
        name="update-delete-film-episode",
    ),
    path(
        "film/<slug:film_slug>/episode/<slug:film_episode_slug>/",
        FilmEpisodeInfoView.as_view(),
        name="film-episode-info",
    ),
    path(
        "film/<slug:film_slug>/rate/",
        CreateRateFilmView.as_view(),
        name="create-rate-film",
    ),
    path(
        "film/<slug:film_slug>/episodes/<slug:film_episode_slug>/rate/",
        CreateRateFilmEpisodeView.as_view(),
        name="create-rate-film-episode",
    ),
    # Test xong.
    path(
        "film/<slug:film_slug>/comments/",
        ListCommentsForFilmView.as_view(),
        name="list-comments-for-film",
    ),
    path(
        "film/<slug:film_slug>/comments/create/",
        CreateCommentForFilmView.as_view(),
        name="create-comment-for-film",
    ),
    path(
        "film/<slug:film_slug>/comments/<int:pk>/",
        UpdateDeleteCommentForFilmView.as_view(),
        name="update-delete-comment-for-film",
    ),
    path(
        "film/<slug:film_slug>/episodes/<slug:film_episode_slug>/comments/",
        ListCommentsForFilmEpisodeView.as_view(),
        name="list-comments-for-film-episode",
    ),
    path(
        "film/<slug:film_slug>/episodes/<slug:film_episode_slug>/comments/create/",
        CreateCommentForFilmEpisodeView.as_view(),
        name="create-comment-for-film-episode",
    ),
    path(
        "film/<slug:film_slug>/episodes/<slug:film_episode_slug>/comments/<int:pk>/",
        UpdateDeleteCommentForFilmView.as_view(),
        name="update-delete-comment-for-film-episode",
    ),
    path("history/", ListCreateHistoryView.as_view(), name="list-create-history"),
    path(
        "history/<slug:film_episode_slug>/",
        DeleteHistoryView.as_view(),
        name="delete-history",
    ),
    path(
        "tracking/",
        CreateTrackingView.as_view(),
        name="create-tracking",
    ),
    path(
        "playlist/",
        ListCreatePlayListView.as_view(),
        name="list-create-playlist",
    ),
    path(
        "playlist/<slug:playlist_slug>/",
        RetrieveUpdateDeletePlayListView.as_view(),
        name="retrieve-update-delete-playlist",
    ),
    path(
        "playlist/<slug:playlist_slug>/create/",
        CreatePlayListEpisodeView.as_view(),
        name="create-playlist-episode",
    ),
    path(
        "playlist/<slug:playlist_slug>/episode/<int:pk>/",
        UpdateDeletePlayListEpisodeView.as_view(),
        name="update-delete-playlist-episode",
    ),
    path("search/", SearchView.as_view(), name="search"),
]
