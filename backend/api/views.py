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
from django.contrib.auth import authenticate


# testing user


class ListUserGenericView(generics.ListAPIView):
    model = User

    def get(self, request, *args, **kwargs):
        user = User.objects.all()
        user_serializer = UserSerializer(user, many=True)
        return JsonResponse(user_serializer.data, safe=False)


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
        category = get_object_or_404(Category, pk=kwargs.get("pk"))
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
        category = get_object_or_404(Category, pk=kwargs.get("pk"))
        category.delete()
        return JsonResponse(
            {"message": "Delete Category successful!"}, status=status.HTTP_200_OK
        )


class ListCategoryView(generics.ListAPIView):
    model = Category
    serializer_class = CategorySerializer

    def get(self, request, *args, **kwargs):
        categories = Category.objects.all()
        categories_serializer = CategorySerializer(categories, many=True)
        return JsonResponse(categories_serializer.data, safe=False)


class CategoryInfoView(generics.RetrieveAPIView):
    serializer_class = ActorSerializer

    def get(self, request, *args, **kwargs):
        category_slug = self.kwargs["category_slug"]
        category = get_object_or_404(Category, slug=category_slug)
        films_with_category = category.film_set.all()
        return JsonResponse(
            {
                "category": CategorySerializer(
                    category, context=self.get_serializer_context()
                ).data,
                "films": FilmSerializer(
                    films_with_category,
                    context=self.get_serializer_context(),
                    many=True,
                ).data,
            }
        )


# class này đưa ra các đất nước và quốc kỳ.
class ListCountryView(generics.ListAPIView):
    model = Country
    serializer_class = CountrySerializer

    def get(self, request, *args, **kwargs):
        countries = Country.objects.all()
        countries_serializer = CountrySerializer(countries, many=True)
        return JsonResponse(countries_serializer.data, safe=False)


class ListActorInCountryView(generics.ListAPIView):
    model = Actor
    serializer_class = ActorSerializer

    def get(self, request, *args, **kwargs):
        country = get_object_or_404(Country, slug=kwargs.get("country_slug"))
        actors = Actor.objects.filter(country=country)
        return JsonResponse(
            {"actors": ActorSerializer(actors, many=True).data},
            status=status.HTTP_200_OK,
        )


# Class này đưa ra danh sách tất cả các diễn viên
class ListActorView(generics.ListAPIView):
    model = Actor
    serializer_class = ActorSerializer

    def get(self, request, *args, **kwargs):
        actors = Actor.objects.all()
        return JsonResponse(
            {"actors": ActorSerializer(actors, many=True).data},
            status=status.HTTP_200_OK,
        )


# Class này tạo ra các Actor.
class ListCreateActorView(generics.ListCreateAPIView):
    serializer_class = ActorSerializer
    permission_classes = [permissions.IsAdminUser]

    def get_queryset(self):
        return Actor.objects.all()

    def post(self, request, *args, **kwargs):
        serializer = ActorSerializer(data=request.data)
        print(request.data)
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
        return JsonResponse(
            {
                "actor": ActorSerializer(
                    actor, context=self.get_serializer_context()
                ).data,
                "films": FilmSerializer(
                    films_with_actor, context=self.get_serializer_context(), many=True
                ).data,
            }
        )


# Class này là class đăng ký
class RegisterAPIView(generics.GenericAPIView):
    serializer_class = CreateUserSerializer

    def post(self, request, *args, **kwargs):
        serializer = CreateUserSerializer(data=request.data)
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


class UpdateDeleteUserView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def delete(self, request, *args, **kwargs):
        user = self.get_object()

        if user != self.request.user:
            return JsonResponse(
                {"message": "You don't have permission to delete this user"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        user.delete()
        return JsonResponse(
            {"message": "Delete user successful!"}, status=status.HTTP_200_OK
        )

    def update(self, request, *args, **kwargs):
        user = self.get_object()

        if user != self.request.user:
            return JsonResponse(
                {"message": "You don't have permission to update this user"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        user.email = self.request.data["email"]
        user.save()
        return JsonResponse(
            {"message": "Update user successful"}, status=status.HTTP_200_OK
        )


class UpdatePasswordView(generics.UpdateAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def update(self, request, *args, **kwargs):
        user = authenticate(username = self.request.user.username, password = self.request.data["old_password"])
        if user is None:
            return JsonResponse(
                {"message": "password incorrect"}, status=status.HTTP_400_BAD_REQUEST
            )
        user.set_password(self.request.data["new_password"])
        user.save()
        return JsonResponse(
            {"message": "Update password successful"}, status=status.HTTP_200_OK
        )


# Class này đưa ra tất cả phim
class ListFilmView(generics.ListAPIView):
    model = Film
    serializer_class = FilmSerializer

    def get(self, request, *args, **kwargs):
        film = Film.objects.all()
        film_serializer = FilmSerializer(film, many=True)
        return JsonResponse(film_serializer.data, safe=False)


class FilmInfoView(generics.RetrieveAPIView):
    model = Film
    serializer_class = FilmSerializer

    def get(self, request, *args, **kwargs):
        film_slug = self.kwargs["film_slug"]
        film = get_object_or_404(Film, slug=film_slug)
        average_rate = RateFilm.objects.filter(film=film).aggregate(Avg("rate"))[
            "rate__avg"
        ]
        if average_rate is None:
            average_rate = 0

        return JsonResponse(
            {
                "film": FilmSerializer(
                    film, context=self.get_serializer_context()
                ).data,
                "actors": ActorSerializer(
                    film.actors, context=self.get_serializer_context(), many=True
                ).data,
                "categories": CategorySerializer(
                    film.categories, context=self.get_serializer_context(), many=True
                ).data,
                "country": CountrySerializer(
                    film.country, context=self.get_serializer_context()
                ).data,
                "average_rate": average_rate,
                "film_episodes": FilmEpisodeSerializer(
                    FilmEpisode.objects.filter(film=film),
                    context=self.get_serializer_context(),
                    many=True,
                ).data,
            },
            status=status.HTTP_200_OK,
        )


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
        film = get_object_or_404(Film, pk=kwargs.get("pk"))
        film.delete()
        return JsonResponse(
            {"message": "Delete film successful!"}, status=status.HTTP_200_OK
        )

    def put(self, request, *args, **kwargs):
        film = get_object_or_404(Film, pk=kwargs.get("pk"))
        serializer = FilmSerializer(film, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(
                {"message": "Update Film successful!"}, status=status.HTTP_200_OK
            )

        return JsonResponse(
            {"message": "Update Film unsuccessful!"}, status=status.HTTP_400_BAD_REQUEST
        )


# class này đưa ra danh sách các tập phim trong một bộ phim và tạo ra tập phim mới
class ListCreateFilmEpisodeView(generics.ListCreateAPIView):
    model = FilmEpisode
    serializer_class = FilmEpisodeSerializer
    permission_classes = [permissions.IsAdminUser]

    def get_queryset(self):
        pk = self.kwargs["pk"]
        return FilmEpisode.objects.filter(film__pk=pk)

    def post(self, request, *args, **kwargs):
        data = request.data
        data["film"] = kwargs.get("pk")
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
        film_episode = get_object_or_404(
            FilmEpisode, pk=kwargs.get("pk"), film__pk=kwargs.get("film_pk")
        )
        film_episode.delete()
        return JsonResponse(
            {"message": "Delete Episode successful!"}, status=status.HTTP_200_OK
        )

    def update(self, request, *args, **kwargs):
        data = request.data
        data["film"] = kwargs.get("film_pk")
        film_episode = get_object_or_404(
            FilmEpisode, pk=kwargs.get("pk"), film__pk=kwargs.get("film_pk")
        )
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


class FilmEpisodeInfoView(generics.RetrieveAPIView):
    model = FilmEpisode
    serializer_class = FilmEpisodeSerializer

    def get(self, request, *args, **kwargs):
        film_slug = self.kwargs["film_slug"]
        film_episode_slug = self.kwargs["film_episode_slug"]
        film_episode = get_object_or_404(
            FilmEpisode, slug=film_episode_slug, film__slug=film_slug
        )
        if self.request.user.username == "":
            if film_episode.film.age_restriction != 0:
                return JsonResponse(
                    {"message": "Sorry, content is age-rstriction"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
        else:
            try:
                user_profile = UserProfile.objects.get(user=self.request.user)
                delta = datetime.now().date() - user_profile.birth
            except UserProfile.DoesNotExist:
                delta = 0
            if delta // 365 < film_episode.film.age_restriction:
                return JsonResponse(
                    {"message": "Sorry, content is age-rstriction"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
        average_rate = RateFilmEpisode.objects.filter(
            film_episode=film_episode
        ).aggregate(Avg("rate"))["rate__avg"]
        if average_rate is None:
            average_rate = 0

        return JsonResponse(
            {
                "film_episode": FilmEpisodeSerializer(
                    film_episode, context=self.get_serializer_context()
                ).data,
                "average_rate": average_rate,
            },
            status=status.HTTP_200_OK,
        )


# class này tạo ra rate cho bộ phim
class CreateRateFilmView(generics.CreateAPIView):
    serializer_class = RateFilmSerializer
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        data = dict()
        data["rate"] = request.data["rate"]
        user = self.request.user
        film = get_object_or_404(Film, slug=self.kwargs["film_slug"])
        data["user"] = user.pk
        data["film"] = film.pk
        serializer = RateFilmSerializer(data=data)
        existing_rate = RateFilm.objects.filter(user=user, film=film).first()
        if existing_rate:
            serializer.instance = existing_rate
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(
                {"message": "Create a new Rate Film successful!"},
                status=status.HTTP_201_CREATED,
            )
        return JsonResponse(
            {"message": "Create a new Rate Film unsuccessful!"},
            status=status.HTTP_400_BAD_REQUEST,
        )


# Class này tạo ra rate cho tập phim
class CreateRateFilmEpisodeView(generics.CreateAPIView):
    serializer_class = RateFilmEpisodeSerializer
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        data = dict()
        data["rate"] = request.data["rate"]
        user = self.request.user
        film_episode = get_object_or_404(
            FilmEpisode,
            film__slug=self.kwargs["film_slug"],
            slug=self.kwargs["film_episode_slug"],
        )
        data["user"] = user.pk
        data["film_episode"] = film_episode.pk
        serializer = RateFilmEpisodeSerializer(data=data)
        existing_rate = RateFilmEpisode.objects.filter(
            user=user, film_episode=film_episode
        ).first()
        if existing_rate:
            serializer.instance = existing_rate
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(
                {"message": "Create a new Rate Film Episode successful!"},
                status=status.HTTP_201_CREATED,
            )
        return JsonResponse(
            {"message": "Create a new Rate Film Episode unsuccessful!"},
            status=status.HTTP_400_BAD_REQUEST,
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
        data = dict()
        data["content"] = request.data["content"]
        parent_comment = None
        if "parent_comment" in request.data:
            data["parent_comment"] = request.data["parent_comment"]
            parent_comment = get_object_or_404(
                Comment, pk=request.data["parent_comment"]
            )

        data["user"] = user.id
        data["time"] = datetime.now()

        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        comment = Comment.objects.create(
            user=user,
            time=datetime.now(),
            content=data.get("content"),
            parent_comment=parent_comment,
        )
        CommentFilm.objects.create(comment=comment, film=film)
        return JsonResponse(
            {"message": "Create comment successful!"}, status=status.HTTP_201_CREATED
        )


# class này update và delete các comment trong một bộ phim
class UpdateDeleteCommentForFilmView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def delete(self, request, *args, **kwargs):
        comment = get_object_or_404(
            Comment, user=self.request.user, pk=kwargs.get("pk")
        )
        comment.delete()
        return JsonResponse(
            {"message": "Delete film successful!"}, status=status.HTTP_200_OK
        )

    def put(self, request, *args, **kwargs):
        comment = get_object_or_404(
            Comment, pk=kwargs.get("pk"), user=self.request.user
        )
        serializer = CommentSerializer(comment, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(
                {"message": "Update Comment successful!"}, status=status.HTTP_200_OK
            )
        return JsonResponse(
            {"message": "Update Comment unsuccessful!"},
            status=status.HTTP_400_BAD_REQUEST,
        )


# class này đưa ra các comment trong 1 bộ phim
class ListCommentsForFilmEpisodeView(generics.ListAPIView):
    serializer_class = CommentSerializer

    def get_queryset(self):
        film_episode = get_object_or_404(
            FilmEpisode,
            film__slug=self.kwargs["film_slug"],
            slug=self.kwargs["film_episode_slug"],
        )
        comment_ids = CommentFilmEpisode.objects.filter(
            film_episode=film_episode
        ).values_list("comment_id", flat=True)
        return Comment.objects.filter(id__in=comment_ids)


class CreateCommentForFilmEpisodeView(generics.CreateAPIView):
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def create(self, request, *args, **kwargs):
        film_episode = get_object_or_404(
            FilmEpisode,
            film__slug=self.kwargs["film_slug"],
            slug=self.kwargs["film_episode_slug"],
        )
        user = self.request.user
        data = dict()
        data["content"] = request.data["content"]
        parent_comment = None
        if "parent_comment" in request.data:
            data["parent_comment"] = request.data["parent_comment"]
            parent_comment = get_object_or_404(
                Comment, pk=request.data["parent_comment"]
            )

        data["user"] = user.id
        data["time"] = datetime.now()

        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        comment = Comment.objects.create(
            user=user,
            time=datetime.now(),
            content=data.get("content"),
            parent_comment=parent_comment,
        )
        CommentFilmEpisode.objects.create(comment=comment, film_episode=film_episode)
        return JsonResponse(
            {"message": "Create comment successful!"}, status=status.HTTP_201_CREATED
        )


class ListCreateHistoryView(generics.ListCreateAPIView):
    model = History
    serializer_class = HistorySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        histories = History.objects.filter(user=self.request.user)
        history_serializer = HistorySerializer(histories, many=True)
        return JsonResponse(history_serializer.data, safe=False)

    def create(self, request, *args, **kwargs):
        data = dict()
        data["user"] = self.request.user.pk
        film_episode = get_object_or_404(FilmEpisode, slug=request.data["film_episode"])
        data["film_episode"] = film_episode.pk
        data["time"] = datetime.now()
        history = History.objects.filter(
            user=self.request.user,
            film_episode=film_episode,
            time__date=data["time"].date(),
        ).first()
        serializer = HistorySerializer(history, data=data)

        if serializer.is_valid():
            serializer.save()
            return JsonResponse(
                {"message": "Create a new History successful!"},
                status=status.HTTP_201_CREATED,
            )

        return JsonResponse(
            {
                "message": "Create a new History unsuccessful!",
            },
            status=status.HTTP_400_BAD_REQUEST,
        )


class DeleteHistoryView(generics.DestroyAPIView):
    model = History
    serializer_class = History
    permission_classes = [permissions.IsAuthenticated]

    def delete(self, request, *args, **kwargs):
        film_episode = get_object_or_404(
            FilmEpisode, slug=kwargs.get("film_episode_slug")
        )
        histories = History.objects.filter(
            user=self.request.user, film_episode=film_episode
        )
        for history in histories:
            history.delete()
        return JsonResponse(
            {"message": "Delete Episode successful!"}, status=status.HTTP_200_OK
        )


class CreateTrackingView(generics.CreateAPIView):
    model = Tracking
    serializer_class = TrackingSerializer

    def create(self, request, *args, **kwargs):
        data = dict()
        data["user"] = self.request.user.pk
        film_episode = get_object_or_404(
            FilmEpisode, slug=request.data["film_episode_slug"]
        )
        data["film_episode"] = film_episode.pk
        data["time"] = request.data["time"]
        tracking = Tracking.objects.filter(
            user=self.request.user,
            film_episode=film_episode,
        ).first()
        serializer = TrackingSerializer(tracking, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(
                {"message": "Create a new Tracking successful!"},
                status=status.HTTP_201_CREATED,
            )
        return JsonResponse(
            {"message": "Create a new Tracking unsuccessful!"},
            status=status.HTTP_400_BAD_REQUEST,
        )


class ListCreatePlayListView(generics.ListCreateAPIView):
    model = PlayList
    serializer_class = PlayListSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        play_lists = PlayList.objects.filter(user=self.request.user)
        play_list_serializer = PlayListSerializer(play_lists, many=True)
        return JsonResponse(play_list_serializer.data, safe=False)

    def create(self, request, *args, **kwargs):
        data = dict()
        data["user"] = self.request.user.pk
        data["name"] = request.data["name"]
        serializer = PlayListSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return JsonResponse(
                {"message": "Create a new Play List successful!"},
                status=status.HTTP_201_CREATED,
            )

        return JsonResponse(
            {"message": "Create a new Play List unsuccessful!"},
            status=status.HTTP_400_BAD_REQUEST,
        )


class RetrieveUpdateDeletePlayListView(generics.RetrieveUpdateDestroyAPIView):
    model = PlayList
    serializer_class = PlayListSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        play_list = get_object_or_404(
            PlayList, user=self.request.user, slug=kwargs.get("playlist_slug")
        )
        play_list_episodes = PlayListEpisode.objects.filter(
            play_list=play_list
        ).order_by("index")
        return JsonResponse(
            {
                "play_list": PlayListSerializer(
                    play_list, context=self.get_serializer_context()
                ).data,
                "episodes": PlayListEpisodeSerializer(
                    play_list_episodes, context=self.get_serializer_context(), many=True
                ).data,
            },
            status=status.HTTP_200_OK,
        )

    def delete(self, request, *args, **kwargs):
        playlist = get_object_or_404(
            PlayList, user=self.request.user, slug=kwargs.get("playlist_slug")
        )
        playlist.delete()
        return JsonResponse(
            {"message": "Delete Play List successful!"}, status=status.HTTP_200_OK
        )

    def put(self, request, *args, **kwargs):
        playlist = get_object_or_404(
            PlayList, user=self.request.user, slug=kwargs.get("playlist_slug")
        )
        data = dict()
        data["user"] = self.request.user.pk
        data["name"] = request.data["name"]
        serializer = PlayListSerializer(playlist, data=data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return JsonResponse(
                {"message": "Update Play List successful!"}, status=status.HTTP_200_OK
            )

        return JsonResponse(
            {"message": "Update Play List unsuccessful!"},
            status=status.HTTP_400_BAD_REQUEST,
        )


class CreatePlayListEpisodeView(generics.CreateAPIView):
    model = PlayListEpisode
    serializer_class = PlayListEpisodeSerializer
    permission_classes = [permissions.IsAuthenticated]

    def create(self, request, *args, **kwargs):
        play_list = get_object_or_404(
            PlayList, user=self.request.user, slug=kwargs.get("playlist_slug")
        )
        film_episode = get_object_or_404(
            FilmEpisode, slug=self.request.data["film_episode_slug"]
        )
        play_list_episodes = PlayListEpisode.objects.filter(play_list=play_list)
        for episode in play_list_episodes:
            if episode.film_episode == film_episode:
                return JsonResponse(
                    {"message": "Episode exists in this Play List"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
        data = dict()
        data["play_list"] = play_list.pk
        data["film_episode"] = film_episode.pk
        data["index"] = len(play_list_episodes) + 1
        serializer = PlayListEpisodeSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return JsonResponse(
                {"message": "Create a new Play List Episode successful!"},
                status=status.HTTP_201_CREATED,
            )

        return JsonResponse(
            {"message": "Create a new Play List Episode unsuccessful!"},
            status=status.HTTP_400_BAD_REQUEST,
        )


class UpdateDeletePlayListEpisodeView(generics.RetrieveUpdateDestroyAPIView):
    model = PlayList
    serializer_class = PlayListSerializer
    permission_classes = [permissions.IsAuthenticated]

    def delete(self, request, *args, **kwargs):
        play_list = get_object_or_404(
            PlayList, user=self.request.user, slug=kwargs.get("playlist_slug")
        )
        play_list_episode = get_object_or_404(
            PlayListEpisode, play_list=play_list, pk=kwargs.get("pk")
        )
        play_list_episode.delete()
        cnt = 0
        play_list_episodes = PlayListEpisode.objects.filter(
            play_list=play_list
        ).order_by("index")
        for episode in play_list_episodes:
            cnt += 1
            episode.index = cnt
            episode.save()
        return JsonResponse(
            {"message": "Delete Play List Episode successful!"},
            status=status.HTTP_200_OK,
        )

    def put(self, request, *args, **kwargs):
        play_list = get_object_or_404(
            PlayList, user=self.request.user, slug=kwargs.get("playlist_slug")
        )
        play_list_episode = get_object_or_404(
            PlayListEpisode, play_list=play_list, pk=kwargs.get("pk")
        )
        index = int(self.request.data["index"])
        play_list_episode.index = index
        play_list_episode.save()
        cnt = 0
        play_list_episodes = PlayListEpisode.objects.filter(
            play_list=play_list
        ).order_by("index")
        for episode in play_list_episodes:
            if episode == play_list_episode:
                continue
            cnt += 1
            if cnt == index:
                cnt += 1
            episode.index = cnt
            episode.save()

        return JsonResponse(
            {"message": "Update Play List Episode successful!"},
            status=status.HTTP_200_OK,
        )


class SearchView(generics.RetrieveAPIView):
    model = Film
    serializer_class = FilmSerializer

    def get(self, request, *args, **kwargs):
        keyword = request.data["keyword"]
        categories = request.data["categories"]
        films = Film.objects.filter(name__contains=keyword)
        if len(categories) > 0:
            tmp = []
            for film in films:
                cnt = 0
                for category in film.categories.all():
                    if category.pk in categories:
                        cnt += 1
                if cnt == len(categories):
                    tmp.append(film)
            films = tmp
        return JsonResponse(
            {
                "films": FilmSerializer(
                    films, context=self.get_serializer_context(), many=True
                ).data
            },
            status=status.HTTP_200_OK,
        )
