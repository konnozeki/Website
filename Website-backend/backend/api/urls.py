from django.urls import path
from api.views import *
from api.api import *
from knox import views as knox_views

urlpatterns = [
    path('country/', ListCountryView.as_view(), name = 'country'),

    path('register/', RegisterAPIView.as_view(), name = 'register'),
    path('logout', knox_views.LogoutView.as_view(), name='logout'),
    path('api/logoutall', knox_views.LogoutAllView.as_view(), name='logout-all'),
    path('login/', LoginAPI.as_view(), name = 'login'),
    
    path('actor/', ListActorView.as_view()),
    path('admin/actor/', ListCreateActorView.as_view(), name = 'create-actor'),
    path('admin/actor/<int:pk>', UpdateDeleteActorView.as_view(), name = 'update-delete-actor'),

    path('admin/user_list/', ListUserView.as_view()),
    path('admin/user_list/<int:pk>', UpdateDeleteUserAdminView.as_view()),
    path('user/<int:pk>', UpdateDeleteUserView.as_view()),
    path('user_profile/<int:pk>', UpdateUserProfileView.as_view()),

    path('admin/category/', ListCreateCategoryView.as_view()),
    path('admin/category/<int:pk>', UpdateDeleteCategoryView.as_view()),
    path('category/', ListCategoryView.as_view()),

    path('film/', ListFilmView.as_view()),
    path('admin/film/', ListCreateFilmView.as_view()),
    path('admin/film/<int:pk>', UpdateDeleteFilmView.as_view()),
]   