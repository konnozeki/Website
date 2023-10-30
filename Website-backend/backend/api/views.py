from django.shortcuts import render

from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from api.models import *
from api.serializers import *
from django.shortcuts import get_object_or_404  
from rest_framework import status  
from rest_framework import viewsets, permissions, generics
from rest_framework.response import Response
from knox.models import AuthToken
from .serializers import *
from .models import *
from rest_framework import viewsets, permissions, generics
from rest_framework.response import Response
from knox.models import AuthToken
from .serializers import *
from .models import *


class ListCategoryView(generics.ListAPIView):
    model = Category
    serializer_class = CategorySerializer
    def get(self, request, *args, **kwargs):
        categories = Category.objects.all()
        categories_serializer = CategorySerializer(categories, many = True)
        return JsonResponse(categories_serializer.data, safe=False)
    
class ListCreateCategoryView(generics.ListCreateAPIView):
    model = Category
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAdminUser]
    def get(self, request, *args, **kwargs):
        categories = Category.objects.all()
        categories_serializer = CategorySerializer(categories, many = True)
        return JsonResponse(categories_serializer.data, safe=False)
    
    def post(self, request, *args, **kwargs):
        serializer = CategorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse({
                'message': 'Create a new Category successful!'
            }, status=status.HTTP_201_CREATED)

        return JsonResponse({
            'message': 'Create a new Category unsuccessful!'
        }, status=status.HTTP_400_BAD_REQUEST)


class UpdateDeleteCategoryView(generics.RetrieveUpdateDestroyAPIView):
    model = Category
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAdminUser]
    def get_queryset(self):
        return Category.objects.all()
    def put(self, request, *args, **kwargs):
        category = get_object_or_404(Category, id = kwargs.get('pk'))
        serializer = CategorySerializer(category, data = request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse({
                'message': 'Update Category successful!'
            }, status=status.HTTP_200_OK)

        return JsonResponse({
            'message': 'Update Category unsuccessful!'
        }, status=status.HTTP_400_BAD_REQUEST)


    def delete(self, request, *args, **kwargs):
        category = get_object_or_404(Category, id = kwargs.get('pk'))
        category.delete()
        return JsonResponse({
            'message': 'Delete Category successful!'
        }, status=status.HTTP_200_OK)


class ListCountryView(generics.ListAPIView):
    model = Country
    serializer_class = CountrySerializer
    def get(self, request, *args, **kwargs):
        countries = Country.objects.all()
        countries_serializer = CountrySerializer(countries, many = True)
        return JsonResponse(countries_serializer.data, safe=False)



    

class ListActorView(generics.ListAPIView):
    model = Actor
    serializer_class = ActorSerializer
    def get(self, request, *args, **kwargs):
        actors = Actor.objects.all()
        actors_serializer = ActorSerializer(actors, many = True)
        return JsonResponse(actors_serializer.data, safe=False)
    
class ListCreateActorView(generics.ListCreateAPIView):
    serializer_class = ActorSerializer
    permission_classes = [permissions.IsAdminUser]

    def get(self, request, *args, **kwargs):
        actors = Actor.objects.all()
        actors_serializer = ActorSerializer(actors, many = True)
        return JsonResponse(actors_serializer.data, safe=False)

    def post(self, request, *args, **kwargs):
        serializer = ActorSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse({
                'message': 'Create a new Actor successful!'
            }, status=status.HTTP_201_CREATED)

        return JsonResponse({
            'message': 'Create a new Actor unsuccessful!'
        }, status=status.HTTP_400_BAD_REQUEST)
    

class UpdateDeleteActorView(generics.RetrieveUpdateDestroyAPIView):
    model = Actor
    serializer_class = ActorSerializer
    permission_classes = [permissions.IsAdminUser]
    def get_queryset(self):
        return Actor.objects.all()
    def put(self, request, *args, **kwargs):
        actor = get_object_or_404(Actor, id = kwargs.get('pk'))
        serializer = ActorSerializer(actor, data = request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse({
                'message': 'Update Actor successful!'
            }, status=status.HTTP_200_OK)

        return JsonResponse({
            'message': 'Update Actor unsuccessful!'
        }, status=status.HTTP_400_BAD_REQUEST)


    def delete(self, request, *args, **kwargs):
        actor = get_object_or_404(Actor, id = kwargs.get('pk'))
        actor.delete()
        return JsonResponse({
            'message': 'Delete Actor successful!'
        }, status=status.HTTP_200_OK)






class RegisterAPIView(generics.GenericAPIView):
    serializer_class = CreateUserSerializer
    def post(self, request, *args, **kwargs):
        data = JSONParser().parse(request)
        serializer = UserSerializer(data=data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
            })
        return JsonResponse(serializer.errors, status=400)

class ListUserView(generics.ListAPIView):
    model = User
    serializer_class = UserSerializer
    def get_queryset(self):
        return User.objects.all()


class UpdateDeleteUserAdminView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsAdminUser]
    model = User
    serializer_class = UserSerializer
    def delete(self, request, *args, **kwargs):
        user = get_object_or_404(User, id = kwargs.get('pk'))

        user.delete()
        return JsonResponse({
            'message': 'Delete user successful!'
        }, status=status.HTTP_200_OK)










class UpdateDeleteUserView(generics.RetrieveDestroyAPIView):
    permission_classes = [permissions.IsAuthenticated]
    model = User
    serializer_class = UserSerializer
    def delete(self, request, *args, **kwargs):
        user = get_object_or_404(User, id = kwargs.get('pk'))
        userProfile = get_object_or_404(UserProfile, user = user)
        if(user!=self.request.user):
            return JsonResponse({
                'message': 'You don\'t have permission to delete this user'
            }, status=status.HTTP_400_BAD_REQUEST)
        userProfile.delete()
        user.delete()
        return JsonResponse({
            'message': 'Delete user successful!'
        }, status=status.HTTP_200_OK)


class UpdateUserProfileView(generics.RetrieveUpdateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    model = UserProfile
    serializer_class = UserProfileSerializer
    def put(self, request, *args, **kwargs):
        user = get_object_or_404(User, id = kwargs.get('pk'))
        if(user!=self.request.user):
            return JsonResponse({
                'message': 'You don\'t have permission to update the Profile.'
            }, status=status.HTTP_400_BAD_REQUEST)
        data = JSONParser().parse(request)
        serializer = UserProfileSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)





class ListFilmView(generics.GenericAPIView):
    model = Film
    serializer_class = FilmSerializer
    def get_queryset(self):
        return Film.objects.all()


class ListCreateFilmView(generics.ListCreateAPIView):
    model = Film
    serializer_class = FilmSerializer
    permission_classes=[permissions.IsAdminUser]
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)
    def create(self, request, *args, **kwargs):
        serializer = FilmSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse({
                'message': 'Create a new Film successful!'
            }, status=status.HTTP_201_CREATED)

        return JsonResponse({
            'message': 'Create a new Film unsuccessful!'
        }, status=status.HTTP_400_BAD_REQUEST)
 
class UpdateDeleteFilmView(generics.RetrieveUpdateDestroyAPIView):
    model = Film
    serializer_class = FilmSerializer
    permission_classes=[permissions.IsAdminUser]
    def delete(self, request, *args, **kwargs):
        film = get_object_or_404(Film, id = kwargs.get('pk'))
        film.delete()
        return JsonResponse({
            'message': 'Delete film successful!'
        }, status=status.HTTP_200_OK)
    
    def get_queryset(self):
        return Film.objects.all()
    def put(self, request, *args, **kwargs):
        film = get_object_or_404(Film, id = kwargs.get('pk'))
        serializer = FilmSerializer(film, data = request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse({
                'message': 'Update Film successful!'
            }, status=status.HTTP_200_OK)

        return JsonResponse({
            'message': 'Update Film unsuccessful!'
        }, status=status.HTTP_400_BAD_REQUEST)

   
class ListFilmEpisodeView(generics.ListAPIView):
    model = FilmEpisode
    serializer_class = FilmSerializer
    def get_queryset(self):
        return Film.objects.all()

class ListCreateFilmEpisodeView(generics.ListCreateAPIView):
    model = FilmEpisode
    serializer_class = FilmEpisodeSerializer
    permission_classes=[permissions.IsAdminUser]
    def post(self, request, *args, **kwargs):
        serializer = FilmEpisodeSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse({
                'message': 'Create a new FilmEpisode successful!'
            }, status=status.HTTP_201_CREATED)

        return JsonResponse({
            'message': 'Create a new FilmEpisode unsuccessful!'
        }, status=status.HTTP_400_BAD_REQUEST)

    
class UpdateDeleteFilmEpisodeView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes=[permissions.IsAdminUser]
    def delete(self, request, *args, **kwargs):
        filmEpisode = get_object_or_404(FilmEpisode, id = kwargs.get('pk'))
        filmEpisode.delete()
        return JsonResponse({
            'message': 'Delete Episode successful!'
        }, status=status.HTTP_200_OK)

    
    def get_queryset(self):
        return FilmEpisode.objects.all()
    def put(self, request, *args, **kwargs):
        filmEpisode = get_object_or_404(FilmEpisode, id = kwargs.get('pk'))
        serializer = FilmEpisodeSerializer(filmEpisode, data = request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse({
                'message': 'Update Episode successful!'
            }, status=status.HTTP_200_OK)

        return JsonResponse({
            'message': 'Update Episode unsuccessful!'
        }, status=status.HTTP_400_BAD_REQUEST)
    

class DeleteHistoryView(generics.RetrieveDestroyAPIView):
    permission_classes=[permissions.IsAdminUser]
    def delete(self, request, *args, **kwargs):
        filmEpisode = get_object_or_404(History, id = kwargs.get('pk'))
        filmEpisode.delete()
        return JsonResponse({
            'message': 'Delete Episode successful!'
        }, status=status.HTTP_200_OK)

    
    def get_queryset(self):
        return History.objects.all()
    