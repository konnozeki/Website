from django.shortcuts import render
from django.db.models import Avg
from django.http import HttpResponse, JsonResponse
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
from datetime import datetime


# testing user


class ListUserGenericView(generics.ListAPIView):
    model = User

    def get(self, request, *args, **kwargs):
        user = User.objects.all()
        user_serializer = UserSerializer(user, many=True)
        return JsonResponse(user_serializer.data, safe=False)


class ListCategoryView(generics.ListAPIView):
    model = Category
    serializer_class = CategorySerializer

    def get(self, request, *args, **kwargs):
        categories = Category.objects.all()
        categories_serializer = CategorySerializer(categories, many=True)
        return JsonResponse(categories_serializer.data, safe=False)


class ListCreateCategoryView(generics.ListCreateAPIView):
    model = Category
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAdminUser]

    def get(self, request, *args, **kwargs):
        categories = Category.objects.all()
        categories_serializer = CategorySerializer(categories, many=True)
        return JsonResponse(categories_serializer.data, safe=False)

    def create(self, request, *args, **kwargs):
        serializer = CategorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(
                {"message": "Create a new Category successful!"},
                status=status.HTTP_201_CREATED,
            )

        return JsonResponse(
            {"message": "Create a new Category unsuccessful!"},
            status=status.HTTP_400_BAD_REQUEST,
        )


class UpdateDeleteCategoryView(generics.RetrieveUpdateDestroyAPIView):
    model = Category
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAdminUser]

    def get_queryset(self):
        return Category.objects.all()

    def put(self, request, *args, **kwargs):
        category = get_object_or_404(Category, slug=kwargs.get("category_slug"))
        serializer = CategorySerializer(category, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(
                {"message": "Update Category successful!"}, status=status.HTTP_200_OK
            )

        return JsonResponse(
            {"message": "Update Category unsuccessful!", "errors": serializer.errors},
            status=status.HTTP_400_BAD_REQUEST,
        )

    def delete(self, request, *args, **kwargs):
        category = get_object_or_404(Category, slug=kwargs.get("category_slug"))
        category.delete()
        return JsonResponse(
            {"message": "Delete Category successful!"}, status=status.HTTP_200_OK
        )


# class này đưa ra các đất nước và quốc kỳ.
class ListCountryView(generics.ListAPIView):
    model = Country
    serializer_class = CountrySerializer

    def get(self, request, *args, **kwargs):
        countries = Country.objects.all()
        countries_serializer = CountrySerializer(countries, many=True)
        return JsonResponse(countries_serializer.data, safe=False)


# Class này đưa ra danh sách tất cả các diễn viên
class ListActorView(generics.ListAPIView):
    model = Actor
    serializer_class = ActorSerializer

    def get(self, request, *args, **kwargs):
        actors = Actor.objects.all()
        actors_serializer = ActorSerializer(actors, many=True)
        return JsonResponse(actors_serializer.data, safe=False)


# Class này đưa ra danh sách diễn viên mà bộ phim này có
class ListActorInFilmView(generics.ListAPIView):
    serializer_class = ActorSerializer

    def get(self, request, *args, **kwargs):
        film_slug = self.kwargs["film_slug"]
        try:
            film = Film.objects.get(slug=film_slug)
            actors_in_film = film.actors.all()
            serialized_actors = self.serializer_class(actors_in_film, many=True).data
            return Response(serialized_actors, status=status.HTTP_200_OK)
        except Film.DoesNotExist:
            return Response(
                {"message": "Film not found"}, status=status.HTTP_404_NOT_FOUND
            )


# Class này đưa ra các bộ phim mà diễn viên này đã đóng
class ListFilmWithActorView(generics.ListAPIView):
    serializer_class = FilmSerializer

    def get_queryset(self):
        actor_slug = self.kwargs["actor_slug"]
        actor = Actor.objects.get(slug=actor_slug)
        films_with_actor = actor.film_set.all()
        return films_with_actor


# Class này tạo ra các Actor.
class ListCreateActorView(generics.ListCreateAPIView):
    serializer_class = ActorSerializer
    permission_classes = [permissions.IsAdminUser]

    def get_queryset(self):
        return Actor.objects.all()

    def post(self, request, *args, **kwargs):
        serializer = ActorSerializer(data=request.data)
        print(serializer.is_valid())
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(
                {"message": "Create a new Actor successful!"},
                status=status.HTTP_201_CREATED,
            )

        return JsonResponse(
            {"message": "Create a new Actor unsuccessful!"},
            status=status.HTTP_400_BAD_REQUEST,
        )


# Class này update và delete các actor
class UpdateDeleteActorView(generics.RetrieveUpdateDestroyAPIView):
    model = Actor
    serializer_class = ActorSerializer
    permission_classes = [permissions.IsAdminUser]

    def get_queryset(self):
        return Actor.objects.all()

    def put(self, request, *args, **kwargs):
        actor = get_object_or_404(Actor, id=kwargs.get("pk"))
        print(kwargs.get("pk"))
        serializer = ActorSerializer(actor, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(
                {"message": "Update Actor successful!"}, status=status.HTTP_200_OK
            )

        return JsonResponse(
            {"message": "Update Actor unsuccessful!"},
            status=status.HTTP_400_BAD_REQUEST,
        )

    def delete(self, request, *args, **kwargs):
        actor = get_object_or_404(Actor, id=kwargs.get("pk"))
        actor.delete()
        return JsonResponse(
            {"message": "Delete Actor successful!"}, status=status.HTTP_200_OK
        )


class ActorInfoView(generics.RetrieveAPIView):
    serializer_class = ActorSerializer

    def get(self, request, *args, **kwargs):
        actor_slug = self.kwargs["actor_slug"]
        actor = get_object_or_404(Actor, slug=actor_slug)
        films_with_actor = actor.film_set.all()
        return JsonResponse({
            "actor": ActorSerializer(actor, context=self.get_serializer_context()).data,
            "films": FilmSerializer(films_with_actor, context=self.get_serializer_context(), many=True).data
        })


# Class này là class đăng ký
class RegisterAPIView(generics.GenericAPIView):
    serializer_class = CreateUserSerializer

    def post(self, request, *args, **kwargs):
        data = JSONParser().parse(request)
        serializer = UserSerializer(data=data)
        if serializer.is_valid():
            user = serializer.save()
            return Response(
                {
                    "user": UserSerializer(
                        user, context=self.get_serializer_context()
                    ).data,
                    "token": AuthToken.objects.create(user)[1],
                }
            )
        return JsonResponse(serializer.errors, status=400)


# Class này liệt kê tất cả người dùng
class ListUserView(generics.ListAPIView):
    permission_classes = [permissions.IsAdminUser]
    serializer_class = UserSerializer

    def get(self, request, *args, **kwargs):
        user = User.objects.all()
        user_serializer = UserSerializer(user, many=True)
        return JsonResponse(user_serializer.data, safe=False)


# Class này update và delete người dùng từ phía admin
class UpdateDeleteUserAdminView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsAdminUser]
    model = User
    serializer_class = UserSerializer

    def delete(self, request, *args, **kwargs):
        user = get_object_or_404(User, id=kwargs.get("pk"))

        user.delete()
        return JsonResponse(
            {"message": "Delete user successful!"}, status=status.HTTP_200_OK
        )

    def update(self, request, *args, **kwargs):
        user = get_object_or_404(User, id=kwargs.get("pk"))
        serializer = self.get_serializer(user, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        return JsonResponse(
            {"message": "Update user successful!", "data": serializer.data},
            status=status.HTTP_200_OK,
        )


# Class này update và delete người dùng từ phía người dùng
class UpdateDeleteUserView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsAuthenticated]
    model = User
    serializer_class = UserSerializer

    def delete(self, request, *args, **kwargs):
        user = get_object_or_404(User, id=kwargs.get("pk"))
        userProfile = get_object_or_404(UserProfile, user=user)
        if user != self.request.user:
            return JsonResponse(
                {"message": "You don't have permission to delete this user"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        userProfile.delete()
        user.delete()
        return JsonResponse(
            {"message": "Delete user successful!"}, status=status.HTTP_200_OK
        )

    def update(self, request, *args, **kwargs):
        user = get_object_or_404(User, id=kwargs.get("pk"))

        if user != self.request.user:
            return JsonResponse(
                {"message": "You don't have permission to update this user"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        user_profile = get_object_or_404(UserProfile, user=user)
        user_serializer = self.get_serializer(user, data=request.data, partial=True)
        user_profile_serializer = UserProfileSerializer(
            user_profile, data=request.data, partial=True
        )

        user_serializer.is_valid(raise_exception=True)
        user_profile_serializer.is_valid(raise_exception=True)

        self.perform_update(user_serializer)
        self.perform_update(user_profile_serializer)

        return JsonResponse(
            {
                "message": "Update user profile successful!",
                "user_data": user_serializer.data,
                "user_profile_data": user_profile_serializer.data,
            },
            status=status.HTTP_200_OK,
        )


# Class này đưa ra tất cả phim
class ListFilmView(generics.ListAPIView):
    model = Film
    serializer_class = FilmSerializer

    def get(self, request, *args, **kwargs):
        film = Film.objects.all()
        film_serializer = FilmSerializer(film, many=True)
        return JsonResponse(film_serializer.data, safe=False)


# Class này đưa ra tất cả phim với thể loại được cho
class ListFilmByCategoryView(generics.ListAPIView):
    serializer_class = FilmSerializer

    def get_queryset(self):
        category_slug = self.kwargs["category_slug"]
        films_by_category = Film.objects.filter(category__slug=category_slug)
        return films_by_category


# Class này đưa ra tất cả phim và tạo ra phim từ phía Admin.
class ListCreateFilmView(generics.ListCreateAPIView):
    model = Film
    serializer_class = FilmSerializer
    permission_classes = [permissions.IsAdminUser]

    def get(self, request, *args, **kwargs):
        film = Film.objects.all()
        film_serializer = FilmSerializer(film, many=True)
        return JsonResponse(film_serializer.data, safe=False)

    def create(self, request, *args, **kwargs):
        serializer = FilmSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(
                {"message": "Create a new Film successful!"},
                status=status.HTTP_201_CREATED,
            )

        return JsonResponse(
            {"message": "Create a new Film unsuccessful!", "errors": serializer.errors},
            status=status.HTTP_400_BAD_REQUEST,
        )


# class này cho phép update và delete film.
class UpdateDeleteFilmView(generics.RetrieveUpdateDestroyAPIView):
    model = Film
    serializer_class = FilmSerializer
    permission_classes = [permissions.IsAdminUser]

    def delete(self, request, *args, **kwargs):
        film = get_object_or_404(Film, slug=kwargs.get("film_slug"))
        film.delete()
        return JsonResponse(
            {"message": "Delete film successful!"}, status=status.HTTP_200_OK
        )

    def put(self, request, *args, **kwargs):
        film = get_object_or_404(Film, slug=kwargs.get("film_slug"))
        serializer = FilmSerializer(film, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(
                {"message": "Update Film successful!"}, status=status.HTTP_200_OK
            )

        return JsonResponse(
            {"message": "Update Film unsuccessful!"}, status=status.HTTP_400_BAD_REQUEST
        )


# class này đưa ra danh sách các tập phim trong một bộ phim
class ListFilmEpisodeView(generics.ListAPIView):
    serializer_class = FilmEpisodeSerializer

    def get_queryset(self):
        film_slug = self.kwargs["film_slug"]
        return FilmEpisode.objects.filter(film__slug=film_slug)


# class này đưa ra danh sách các tập phim trong một bộ phim và tạo ra tập phim mới
class ListCreateFilmEpisodeView(generics.ListCreateAPIView):
    model = FilmEpisode
    serializer_class = FilmEpisodeSerializer
    permission_classes = [permissions.IsAdminUser]

    def get_queryset(self):
        film_slug = self.kwargs["film_slug"]
        return FilmEpisode.objects.filter(film__slug=film_slug)

    def post(self, request, *args, **kwargs):
        serializer = FilmEpisodeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(
                {"message": "Create a new FilmEpisode successful!"},
                status=status.HTTP_201_CREATED,
            )

        return JsonResponse(
            {"message": "Create a new FilmEpisode unsuccessful!"},
            status=status.HTTP_400_BAD_REQUEST,
        )


# class này cho phép update và delete các tập phim
class UpdateDeleteFilmEpisodeView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsAdminUser]
    serializer_class = FilmEpisodeSerializer

    def delete(self, request, *args, **kwargs):
        film_episode = self.get_object()
        film_episode.delete()
        return JsonResponse(
            {"message": "Delete Episode successful!"}, status=status.HTTP_200_OK
        )

    def update(self, request, *args, **kwargs):
        film_episode = self.get_object()
        serializer = self.get_serializer(film_episode, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(
                {"message": "Update Episode successful!"}, status=status.HTTP_200_OK
            )

        return JsonResponse(
            {"message": "Update Episode unsuccessful!", "errors": serializer.errors},
            status=status.HTTP_400_BAD_REQUEST,
        )

    def get_queryset(self):
        return FilmEpisode.objects.all()


# class này đưa ra trung bình rate của bộ phim.
class AverageRateFilmView(generics.RetrieveAPIView):
    serializer_class = RateFilmSerializer

    def get(self, request, *args, **kwargs):
        film_slug = kwargs.get("film_slug")
        film = get_object_or_404(Film, slug=film_slug)

        average_rate = RateFilm.objects.filter(film=film).aggregate(Avg("rate"))[
            "rate__avg"
        ]

        if average_rate is not None:
            response_data = {"film_slug": film_slug, "average_rate": average_rate}
            return JsonResponse(response_data, status=status.HTTP_200_OK)

        return JsonResponse(
            {
                "message": "No ratings available for the specified film",
                "film_slug": film_slug,
            },
            status=status.HTTP_404_NOT_FOUND,
        )


# class này tạo ra rate cho bộ phim
class CreateRateFilmView(generics.CreateAPIView):
    serializer_class = RateFilmSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        film_slug = self.kwargs["film_slug"]
        film = get_object_or_404(Film, slug=film_slug)
        user = self.request.user

        existing_rate = RateFilm.objects.filter(user=user, film=film).first()
        if existing_rate:
            serializer.instance = existing_rate
        else:
            serializer.save(user=user, film=film)

        return JsonResponse(
            {"message": "Create rating successful!"}, status=status.HTTP_201_CREATED
        )


# class này update và delete rate cho bộ phim
class UpdateDeleteRateFilmView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = RateFilmSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        film_slug = self.kwargs["film_slug"]
        user = self.request.user
        return RateFilm.objects.filter(user=user, film__slug=film_slug)

    def perform_destroy(self, instance):
        instance.delete()
        return JsonResponse(
            {"message": "Delete rating successful!"}, status=status.HTTP_200_OK
        )

    def perform_update(self, serializer):
        serializer.save()
        return JsonResponse(
            {"message": "Update rating successful!"}, status=status.HTTP_200_OK
        )


# Class này đưa ra rate trung bình của tập phim
class AverageRateFilmEpisodeView(generics.RetrieveAPIView):
    serializer_class = RateFilmEpisodeSerializer

    def get(self, request, *args, **kwargs):
        film_episode_slug = kwargs.get("film_episode_slug")
        film_episode = get_object_or_404(FilmEpisode, slug=film_episode_slug)

        average_rate = RateFilmEpisode.objects.filter(
            film_episode=film_episode
        ).aggregate(Avg("rate"))["rate__avg"]

        if average_rate is not None:
            response_data = {
                "film_episode_slug": film_episode_slug,
                "average_rate": average_rate,
            }
            return JsonResponse(response_data, status=status.HTTP_200_OK)

        return JsonResponse(
            {
                "message": "No ratings available for the specified film episode",
                "film_episode_slug": film_episode_slug,
            },
            status=status.HTTP_404_NOT_FOUND,
        )


# Class này tạo ra rate cho tập phim
class CreateRateFilmEpisodeView(generics.CreateAPIView):
    serializer_class = RateFilmEpisodeSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        film_slug = self.kwargs["film_slug"]
        film_episode_slug = self.kwargs["film_episode_slug"]

        film = get_object_or_404(Film, slug=film_slug)
        film_episode = get_object_or_404(FilmEpisode, film=film, slug=film_episode_slug)

        user = self.request.user

        existing_rate = RateFilmEpisode.objects.filter(
            user=user, film_episode=film_episode
        ).first()
        if existing_rate:
            serializer.instance = existing_rate
        else:
            serializer.save(user=user, film_episode=film_episode)

        return JsonResponse(
            {"message": "Create rating successful!"}, status=status.HTTP_201_CREATED
        )


# Class này update và delete rate của tập phim
class UpdateDeleteRateFilmEpisodeView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = RateFilmEpisodeSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        film_episode_slug = self.kwargs["film_episode_slug"]
        user = self.request.user
        return get_object_or_404(
            RateFilmEpisode, user=user, film_episode__slug=film_episode_slug
        )

    def perform_destroy(self, instance):
        instance.delete()
        return JsonResponse(
            {"message": "Delete rating successful!"}, status=status.HTTP_200_OK
        )

    def perform_update(self, serializer):
        serializer.save()
        return JsonResponse(
            {"message": "Update rating successful!"}, status=status.HTTP_200_OK
        )


# class này đưa ra các comment trong 1 bộ phim
class ListCommentsForFilmView(generics.ListAPIView):
    serializer_class = CommentSerializer

    def get_queryset(self):
        film_slug = self.kwargs["film_slug"]
        comment_ids = CommentFilm.objects.filter(film__slug=film_slug).values_list(
            "comment_id", flat=True
        )
        return Comment.objects.filter(id__in=comment_ids)


# class này đăng các comment trong một bộ phim
class CreateCommentForFilmView(generics.CreateAPIView):
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def create(self, request, *args, **kwargs):
        film_slug = self.kwargs["film_slug"]
        film = get_object_or_404(Film, slug=film_slug)
        user = self.request.user

        # Manually set user and time fields
        request.data["user"] = user.id
        request.data["time"] = datetime.now()

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        # Create a Comment instance
        comment = Comment.objects.create(
            user=user,
            time=datetime.now(),
            content=request.data.get("content"),
            parent_comment=request.data.get("parent_comment"),
        )

        # Create a CommentFilm instance to associate the comment with the film
        CommentFilm.objects.create(comment=comment, film=film)

        headers = self.get_success_headers(serializer.data)
        return JsonResponse(
            {"message": "Create comment successful!"},
            status=status.HTTP_201_CREATED,
            headers=headers,
        )


# class này update và delete các comment trong một bộ phim
class UpdateDeleteCommentForFilmView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        film_slug = self.kwargs["film_slug"]
        user = self.request.user
        return Comment.objects.filter(pk=self.kwargs["pk"], user=user)

    def perform_destroy(self, instance):
        instance.delete()
        return JsonResponse(
            {"message": "Delete comment successful!"}, status=status.HTTP_200_OK
        )

    def perform_update(self, serializer):
        # Manually set user and time fields
        user = self.request.user
        serializer.validated_data["user"] = user
        serializer.validated_data["time"] = datetime.now()

        serializer.save()
        return JsonResponse(
            {"message": "Update comment successful!"}, status=status.HTTP_200_OK
        )


# class này đưa ra các comment trong 1 bộ phim
class ListCommentsForFilmEpisodeView(generics.ListAPIView):
    serializer_class = CommentSerializer

    def get_queryset(self):
        film_slug = self.kwargs["film_slug"]
        film_episode_slug = self.kwargs["film_episode_slug"]
        film = get_object_or_404(Film, slug=film_slug)
        film_episode = get_object_or_404(FilmEpisode, film=film, slug=film_episode_slug)
        comment_ids = CommentFilmEpisode.objects.filter(
            film_episode__slug=film_episode_slug
        ).values_list("comment_id", flat=True)
        return Comment.objects.filter(id__in=comment_ids)


class CreateCommentForFilmEpisodeView(generics.CreateAPIView):
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def create(self, request, *args, **kwargs):
        film_slug = self.kwargs["film_slug"]
        film_episode_slug = self.kwargs["film_episode_slug"]
        film = get_object_or_404(Film, slug=film_slug)
        film_episode = get_object_or_404(FilmEpisode, film=film, slug=film_episode_slug)
        user = self.request.user

        # Manually set user and time fields
        request.data["user"] = user.id
        request.data["time"] = datetime.now()

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        # Create a Comment instance
        comment = Comment.objects.create(
            user=user,
            time=datetime.now(),
            content=request.data.get("content"),
            parent_comment=request.data.get("parent_comment"),
        )

        # Create a CommentFilm instance to associate the comment with the film
        CommentFilmEpisode.objects.create(comment=comment, film_episode=film_episode)

        headers = self.get_success_headers(serializer.data)
        return JsonResponse(
            {"message": "Create comment successful!"},
            status=status.HTTP_201_CREATED,
            headers=headers,
        )


# class này update và delete các comment trong một bộ phim
class UpdateDeleteCommentForFilmView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        film_slug = self.kwargs["film_slug"]
        user = self.request.user
        return Comment.objects.filter(pk=self.kwargs["pk"], user=user)

    def perform_destroy(self, instance):
        instance.delete()
        return JsonResponse(
            {"message": "Delete comment successful!"}, status=status.HTTP_200_OK
        )

    def perform_update(self, serializer):
        # Manually set user and time fields
        user = self.request.user
        serializer.validated_data["user"] = user
        serializer.validated_data["time"] = datetime.now()

        serializer.save()
        return JsonResponse(
            {"message": "Update comment successful!"}, status=status.HTTP_200_OK
        )
