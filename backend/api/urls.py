from django.urls import path
from api.views import *
from api.api import *
from knox import views as knox_views

urlpatterns = [
    path("generic/user/", ListUserGenericView.as_view()),
    path("country/", ListCountryView.as_view(), name="country"),
    path("register/", RegisterAPIView.as_view(), name="register"),
    path("logout/", knox_views.LogoutView.as_view(), name="logout"),
    path("api/logoutall", knox_views.LogoutAllView.as_view(), name="logout-all"),
    path("login/", LoginAPI.as_view(), name="login"),
    # Test xong.
    path("admin/actor/", ListCreateActorView.as_view(), name="create-actor"),
    path(
        "admin/actor/<int:pk>/",
        UpdateDeleteActorView.as_view(),
        name="update-delete-actor",
    ),
    path(
        "film/<slug:film_slug>/actors/",
        ListActorInFilmView.as_view(),
        name="list-actors-in-film",
    ),
    path("actor/", ListActorView.as_view(), name="list-actor"),
    path("actor/<slug:actor_slug>/", ActorInfoView.as_view(), name="actor-info"),
    # Test xong GET và DELETE
    path("admin/user_list/", ListUserView.as_view()),
    path("admin/user_list/<int:pk>/", UpdateDeleteUserAdminView.as_view()),
    path("user/<int:pk>/", UpdateDeleteUserView.as_view()),
    # Test xong.
    path("admin/category/", ListCreateCategoryView.as_view()),
    path("admin/category/<slug:category_slug>/", UpdateDeleteCategoryView.as_view()),
    path("category/", ListCategoryView.as_view()),
    # Test xong.
    path("film/", ListFilmView.as_view()),
    path("admin/film/", ListCreateFilmView.as_view()),
    path("admin/film/<slug:film_slug>/", UpdateDeleteFilmView.as_view()),
    path(
        "actors/<slug:actor_slug>/film/",
        ListFilmWithActorView.as_view(),
        name="list-films-with-actor",
    ),
    # Test xong.
    path(
        "film/<slug:film_slug>/episodes/",
        ListFilmEpisodeView.as_view(),
        name="list-film-episodes",
    ),
    path(
        "film/<slug:film_slug>/episodes/create/",
        ListCreateFilmEpisodeView.as_view(),
        name="list-create-film-episodes",
    ),
    path(
        "film/<slug:film_slug>/episodes/<int:pk>/",
        UpdateDeleteFilmEpisodeView.as_view(),
        name="update-delete-film-episode",
    ),
    # Test xong.
    path(
        "film/<slug:film_slug>/rate/",
        AverageRateFilmView.as_view(),
        name="average-rate-film",
    ),
    path(
        "film/<slug:film_slug>/rate/create/",
        CreateRateFilmView.as_view(),
        name="create-rate-film",
    ),
    path(
        "film/<slug:film_slug>/rate/<int:pk>/",
        UpdateDeleteRateFilmView.as_view(),
        name="update-delete-rate-film",
    ),
    # Test xong.
    path(
        "film/<slug:film_slug>/episodes/<slug:film_episode_slug>/rate/",
        AverageRateFilmEpisodeView.as_view(),
        name="average-rate-film-episode",
    ),
    path(
        "film/<slug:film_slug>/episodes/<slug:film_episode_slug>/rate/create/",
        CreateRateFilmEpisodeView.as_view(),
        name="create-rate-film-episode",
    ),
    path(
        "film/<slug:film_slug>/episodes/<slug:film_episode_slug>/rate/<int:pk>/",
        UpdateDeleteRateFilmEpisodeView.as_view(),
        name="update-delete-rate-film-episode",
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
]
