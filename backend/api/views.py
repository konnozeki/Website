from django.shortcuts import render

from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from api.models import *
from api.serializers import *

@csrf_exempt
def category_list(request):
    if request.method == "GET":
        category = Category.objects.all()
        serializer = CategorySerializer(category, many=True)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = CategorySerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)
    


@csrf_exempt
def category_detail(request, pk):
    """
    Retrieve, update or delete a code snippet.
    """
    try:
        category = Category.objects.get(pk=pk)
    except Category.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        serializer = CategorySerializer(category)
        return JsonResponse(serializer.data)

    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = CategorySerializer(category, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)

    elif request.method == 'DELETE':
        category.delete()
        return HttpResponse(status=204)
    

@csrf_exempt
def country_list(request):
    if request.method == 'GET':
        country = Country.objects.all()
        serializer = CountrySerializer(country, many=True)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = CountrySerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)
    


@csrf_exempt
def country_detail(request, pk):
    """
    Retrieve, update or delete a code snippet.
    """
    try:
        country = Country.objects.get(pk=pk)
    except Country.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        serializer = CountrySerializer(country)
        return JsonResponse(serializer.data)

    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = CountrySerializer(country, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)

    elif request.method == 'DELETE':
        country.delete()
        return HttpResponse(status=204)
    

#Actor

@csrf_exempt
def actor_list(request):
    if request.method == "GET":
        actor = Actor.objects.all()
        serializer = ActorSerializer(actor, many=True)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = ActorSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)
    


@csrf_exempt
def actor_detail(request, pk):
    """
    Retrieve, update or delete a code snippet.
    """
    try:
        actor = Actor.objects.get(pk=pk)
    except Actor.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        serializer = ActorSerializer(actor)
        return JsonResponse(serializer.data)

    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = ActorSerializer(actor, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)

    elif request.method == 'DELETE':
        actor.delete()
        return HttpResponse(status=204)


#UserProfile
@csrf_exempt
def user_profile_list(request):
    if request.method == "GET":
        user_profile = UserProfile.objects.all()
        serializer = UserProfileSerializer(user_profile, many=True)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = UserProfileSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)
    


@csrf_exempt
def user_profile_detail(request, pk):
    """
    Retrieve, update or delete a code snippet.
    """
    try:
        user_profile = UserProfile.objects.get(pk=pk)
    except UserProfile.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        serializer = UserProfileSerializer(user_profile)
        return JsonResponse(serializer.data)

    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = UserProfileSerializer(user_profile, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)

    elif request.method == 'DELETE':
        user_profile.delete()
        return HttpResponse(status=204)





@csrf_exempt
def user_list(request):
    if request.method == "GET":
        user = User.objects.all()
        serializer = UserSerializer(user, many=True)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = UserSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)
    


@csrf_exempt
def user_detail(request, pk):
    """
    Retrieve, update or delete a code snippet.
    """
    try:
        user = User.objects.get(pk=pk)
    except User.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        serializer = UserProfileSerializer(user)
        return JsonResponse(serializer.data)

    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = UserProfileSerializer(user, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)

    elif request.method == 'DELETE':
        user.delete()
        return HttpResponse(status=204)



#UserProfile
@csrf_exempt
def user_profile_list(request):
    if request.method == "GET":
        user_profile = UserProfile.objects.all()
        serializer = UserProfileSerializer(user_profile, many=True)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = UserProfileSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)
    


@csrf_exempt
def user_profile_detail(request, pk):
    """
    Retrieve, update or delete a code snippet.
    """
    try:
        user_profile = UserProfile.objects.get(pk=pk)
    except UserProfile.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        serializer = UserProfileSerializer(user_profile)
        return JsonResponse(serializer.data)

    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = UserProfileSerializer(user_profile, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)

    elif request.method == 'DELETE':
        user_profile.delete()
        return HttpResponse(status=204)


@csrf_exempt
def film_list(request):
    if request.method == "GET":
        film = Film.objects.all()
        serializer = FilmSerializer(film, many=True)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = FilmSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)
    


@csrf_exempt
def film_detail(request, pk):
    """
    Retrieve, update or delete a code snippet.
    """
    try:
        film = Film.objects.get(pk=pk)
    except Film.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        serializer = FilmSerializer(film)
        return JsonResponse(serializer.data)

    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = FilmSerializer(film, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)

    elif request.method == 'DELETE':
        film.delete()
        return HttpResponse(status=204)
    

@csrf_exempt
def film_episode_list(request):
    if request.method == "GET":
        film_episode = FilmEpisode.objects.all()
        serializer = FilmEpisodeSerializer(film_episode, many=True)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = FilmEpisodeSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)
    


@csrf_exempt
def film_episode_detail(request, pk):
    """
    Retrieve, update or delete a code snippet.
    """
    try:
        film_episode = FilmEpisode.objects.get(pk=pk)
    except FilmEpisode.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        serializer = FilmEpisodeSerializer(film_episode)
        return JsonResponse(serializer.data)

    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = FilmEpisodeSerializer(film_episode, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)

    elif request.method == 'DELETE':
        film_episode.delete()
        return HttpResponse(status=204)
    
@csrf_exempt
def rate_film_list(request):
    if request.method == "GET":
        rate_film = RateFilm.objects.all()
        serializer = RateFilmSerializer(rate_film, many=True)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = RateFilmSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)
    


@csrf_exempt
def rate_film_detail(request, pk):
    """
    Retrieve, update or delete a code snippet.
    """
    try:
        rate_film = RateFilm.objects.get(pk=pk)
    except RateFilm.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        serializer = RateFilmSerializer(rate_film)
        return JsonResponse(serializer.data)

    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = RateFilmSerializer(rate_film, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)

    elif request.method == 'DELETE':
        rate_film.delete()
        return HttpResponse(status=204)
    


@csrf_exempt
def rate_film_episode_list(request):
    if request.method == "GET":
        rate_film_episode = RateFilmEpisode.objects.all()
        serializer = RateFilmEpisodeSerializer(rate_film_episode, many=True)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = RateFilmEpisodeSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)
    


@csrf_exempt
def rate_film_episode_detail(request, pk):
    """
    Retrieve, update or delete a code snippet.
    """
    try:
        rate_film_episode = RateFilmEpisode.objects.get(pk=pk)
    except RateFilmEpisode.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        serializer = RateFilmEpisodeSerializer(rate_film_episode)
        return JsonResponse(serializer.data)

    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = RateFilmEpisodeSerializer(rate_film_episode, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)

    elif request.method == 'DELETE':
        rate_film_episode.delete()
        return HttpResponse(status=204)
    


@csrf_exempt
def comment_list(request):
    if request.method == "GET":
        comment = Comment.objects.all()
        serializer = CommentSerializer(comment, many=True)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = CommentSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)
    


@csrf_exempt
def comment_detail(request, pk):
    """
    Retrieve, update or delete a code snippet.
    """
    try:
        comment = Comment.objects.get(pk=pk)
    except Comment.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        serializer = CommentSerializer(comment)
        return JsonResponse(serializer.data)

    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = CommentSerializer(comment, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)

    elif request.method == 'DELETE':
        comment.delete()
        return HttpResponse(status=204)
    

@csrf_exempt
def comment_film_list(request):
    if request.method == "GET":
        comment_film = CommentFilm.objects.all()
        serializer = CommentFilmSerializer(comment_film, many=True)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = CommentFilmSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)
    


@csrf_exempt
def comment_film_detail(request, pk):
    """
    Retrieve, update or delete a code snippet.
    """
    try:
        comment_film = CommentFilm.objects.get(pk=pk)
    except CommentFilm.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        serializer = CommentFilmSerializer(comment_film)
        return JsonResponse(serializer.data)

    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = CommentFilmSerializer(comment_film, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)

    elif request.method == 'DELETE':
        comment_film.delete()
        return HttpResponse(status=204)
    


@csrf_exempt
def comment_film_episode_list(request):
    if request.method == "GET":
        comment_film_episode = CommentFilmEpisode.objects.all()
        serializer = CommentFilmEpisodeSerializer(comment_film_episode, many=True)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = CommentFilmEpisodeSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)
    


@csrf_exempt
def comment_film_episode_detail(request, pk):
    """
    Retrieve, update or delete a code snippet.
    """
    try:
        comment_film_episode = CommentFilmEpisode.objects.get(pk=pk)
    except CommentFilmEpisode.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        serializer = CommentFilmEpisodeSerializer(comment_film_episode)
        return JsonResponse(serializer.data)

    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = CommentFilmEpisodeSerializer(comment_film_episode, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)

    elif request.method == 'DELETE':
        comment_film_episode.delete()
        return HttpResponse(status=204)
    
@csrf_exempt
def history_list(request):
    if request.method == "GET":
        history = History.objects.all()
        serializer = HistorySerializer(history, many=True)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = HistorySerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)
    


@csrf_exempt
def history_detail(request, pk):
    """
    Retrieve, update or delete a code snippet.
    """
    try:
        history = History.objects.get(pk=pk)
    except History.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        serializer = HistorySerializer(history)
        return JsonResponse(serializer.data)

    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = HistorySerializer(history, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)

    elif request.method == 'DELETE':
        history.delete()
        return HttpResponse(status=204)
    

@csrf_exempt
def tracking_list(request):
    if request.method == "GET":
        tracking = Tracking.objects.all()
        serializer = TrackingSerializer(tracking, many=True)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = TrackingSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)
    


@csrf_exempt
def tracking_detail(request, pk):
    """
    Retrieve, update or delete a code snippet.
    """
    try:
        tracking = Tracking.objects.get(pk=pk)
    except Tracking.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        serializer = TrackingSerializer(tracking)
        return JsonResponse(serializer.data)

    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = TrackingSerializer(tracking, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)

    elif request.method == 'DELETE':
        tracking.delete()
        return HttpResponse(status=204)
    

@csrf_exempt
def play_list_list(request):
    if request.method == "GET":
        play_list = PlayList.objects.all()
        serializer = PlayListSerializer(play_list, many=True)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = PlayListSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)
    


@csrf_exempt
def play_list_detail(request, pk):
    """
    Retrieve, update or delete a code snippet.
    """
    try:
        play_list = PlayList.objects.get(pk=pk)
    except PlayList.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        serializer = PlayListSerializer(play_list)
        return JsonResponse(serializer.data)

    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = PlayListSerializer(play_list, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)

    elif request.method == 'DELETE':
        play_list.delete()
        return HttpResponse(status=204)
    

@csrf_exempt
def play_list_episode_list(request):
    if request.method == "GET":
        play_list_episode = PlayListEpisode.objects.all()
        serializer = PlayListEpisodeSerializer(play_list_episode, many=True)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = PlayListEpisodeSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)
    


@csrf_exempt
def play_list_episode_detail(request, pk):
    """
    Retrieve, update or delete a code snippet.
    """
    try:
        play_list_episode = PlayListEpisode.objects.get(pk=pk)
    except PlayListEpisode.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        serializer = PlayListEpisodeSerializer(play_list_episode)
        return JsonResponse(serializer.data)

    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = PlayListEpisodeSerializer(play_list_episode, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)

    elif request.method == 'DELETE':
        play_list_episode.delete()
        return HttpResponse(status=204)