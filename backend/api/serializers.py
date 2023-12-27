from rest_framework import serializers
from api.models import (
    Category,
    Country,
    Actor,
    User,
    UserProfile,
    Film,
    FilmEpisode,
    RateFilm,
    RateFilmEpisode,
    Comment,
    CommentFilm,
    CommentFilmEpisode,
    History,
    Tracking,
    PlayList,
    PlayListEpisode,
    gender_type,
    age_restrictions,
)
from django.contrib.auth import authenticate
from django.contrib.auth.hashers import make_password
from django.utils.text import slugify


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "name", "description", "slug"]

    def create(self, validated_data):
        validated_data["slug"] = slugify(validated_data["name"])
        return super().create(validated_data)

    def update(self, instance, validated_data):
        validated_data["slug"] = slugify(validated_data["name"])
        return super().update(instance, validated_data)


class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = ["id", "name", "flag", "slug"]


class ActorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Actor
        fields = ["id", "name", "description", "slug", "gender", "country", "avatar"]

    def create(self, validated_data):
        validated_data["slug"] = slugify(validated_data["name"])
        return super().create(validated_data)

    def update(self, instance, validated_data):
        validated_data["slug"] = slugify(validated_data["name"])
        return super().update(instance, validated_data)


class CreateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "username", "password")
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            validated_data["username"], None, validated_data["password"]
        )
        return user


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "username")


class LoginUserSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Invalid Details.")


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = [
            "id",
            "user",
            "birth",
            "gender",
            "avatar",
            "favourite_category",
            "favourite_actor",
        ]


class FilmSerializer(serializers.ModelSerializer):
    class Meta:
        model = Film
        fields = [
            "id",
            "name",
            "slug",
            "description",
            "actors",
            "categories",
            "country",
            "poster",
            "age_restriction",
            "release_date",
        ]

    def create(self, validated_data):
        validated_data["slug"] = slugify(validated_data["name"])
        return super().create(validated_data)

    def update(self, instance, validated_data):
        validated_data["slug"] = slugify(validated_data["name"])
        return super().update(instance, validated_data)


class FilmEpisodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = FilmEpisode
        fields = [
            "id",
            "film",
            "slug",
            "episode",
            "poster",
            "release_date",
            "link",
            "description",
        ]

    def validate_episode(self, value):
        film_episodes = FilmEpisode.objects.filter(film__id=self.initial_data["film"])
        print(self.initial_data)
        for film_episode in film_episodes:
            if self.instance and self.instance == film_episode:
                continue
            if film_episode.episode == value:
                raise serializers.ValidationError("Episode is exists")
        return value

    def create(self, validated_data):
        validated_data["slug"] = "{}-{}".format(
            validated_data["film"].slug, validated_data["episode"]
        )
        return super().create(validated_data)

    def update(self, instance, validated_data):
        validated_data["slug"] = "{}-{}".format(
            validated_data["film"].slug, validated_data["episode"]
        )
        return super().update(instance, validated_data)


class RateFilmSerializer(serializers.ModelSerializer):
    class Meta:
        model = RateFilm
        fields = ["id", "user", "film", "rate"]


class RateFilmEpisodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = RateFilmEpisode
        fields = ["id", "rate", "user", "film_episode"]


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ["id", "user", "parent_comment", "content", "time"]
        read_only_fields = ["id", "user", "time"]


class CommentFilmSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommentFilm
        fields = ["id", "user", "film"]


class CommentFilmEpisodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommentFilmEpisode
        fields = ["id", "user", "film_episode"]


class HistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = History
        fields = ["id", "user", "film_episode", "time"]


class TrackingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tracking
        fields = ["id", "user", "film_episode", "time"]


class PlayListSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlayList
        fields = ["id", "user", "name", "slug"]


class PlayListEpisodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlayListEpisode
        fields = ["id", "play_list", "film_episode", "index"]


class CommentFilmEpisodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommentFilmEpisode
        fields = ["id", "comment", "film_episode"]


class HistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = History
        fields = ["id", "user", "film_episode", "time"]


class TrackingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tracking
        fields = ["id", "user", "film_episode", "time"]


class PlayListSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlayList
        fields = ["id", "user", "name", "slug"]

    def create(self, validated_data):
        validated_data["slug"] = slugify(
            "{}-{}".format(validated_data["user"].username, validated_data["name"])
        )
        return super().create(validated_data)

    def update(self, instance, validated_data):
        validated_data["slug"] = slugify(
            "{}-{}".format(validated_data["user"].username, validated_data["name"])
        )
        return super().update(instance, validated_data)


class PlayListEpisodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlayListEpisode
        fields = ["id", "play_list", "film_episode", "index"]
        depth=1