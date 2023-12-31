from collections.abc import Iterable
from typing import Any
from django.db import models
from django.conf import settings
from django.contrib.auth.models import User
from django.core.exceptions import ObjectDoesNotExist
from django.core.validators import MinValueValidator, MaxValueValidator
import os

# Create your models here.


gender_type = [{"M", "Male"}, {"F", "Female"}, {"O", "Other"}]


class Category(models.Model):
    def __str__(self):
        return self.name  # this 'name' field must be exist in your model.

    name = models.CharField(max_length=50, null=False, unique=True)
    description = models.TextField()
    slug = models.SlugField(null=True)


class Country(models.Model):
    def __str__(self):
        return self.name  # this 'name' field must be exist in your model.

    name = models.CharField(max_length=250, null=False, blank=False)
    flag = models.URLField(null=False)
    slug = models.SlugField(null=True)


def actor_avatar_path(instance, filename):
    extension = filename.split(".")[-1]
    path = "actors/{}.{}".format(instance.slug, extension)

    if os.path.exists(os.path.join(settings.MEDIA_ROOT, path)):
        os.remove(os.path.join(settings.MEDIA_ROOT, path))
    return path


class Actor(models.Model):
    def __str__(self):
        return self.name  # this 'name' field must be exist in your model.

    class Gender(models.TextChoices):
        MALE = "M"
        FEMALE = "F"
        OTHER = "O"

    name = models.CharField(max_length=50, blank=False, null=False, unique=True)
    description = models.TextField()
    slug = models.SlugField(null=True)
    gender = models.CharField(max_length=1, choices=Gender.choices, default="O")
    country = models.ForeignKey(
        Country, null=False, blank=False, on_delete=models.CASCADE
    )
    avatar = models.ImageField(upload_to=actor_avatar_path, null=True)

    def delete(self, *args, **kwargs):
        path = self.avatar.path
        super().delete(*args, **kwargs)
        os.remove(path)


def user_avatar_path(instance, filename):
    extension = filename.split(".")[-1]
    path = "user/{}.{}".format(instance.user.username, extension)

    if os.path.exists(os.path.join(settings.MEDIA_ROOT, path)):
        os.remove(os.path.join(settings.MEDIA_ROOT, path))
    return path


class UserProfile(models.Model):
    class Gender(models.TextChoices):
        MALE = "M"
        FEMALE = "F"
        OTHER = "O"

    user = models.ForeignKey(
        User, on_delete=models.CASCADE, blank=False, null=False, primary_key=True
    )
    birth = models.DateField(null=False, blank=False)
    gender = models.CharField(
        max_length=6, choices=Gender.choices, null=False, blank=False, default="O"
    )
    avatar = models.ImageField(null=True, blank=True, upload_to=user_avatar_path)
    favourite_category = models.ManyToManyField(Category, null=True, blank=True)
    favourite_actor = models.ManyToManyField(Actor, null=True, blank=True)


age_restrictions = [(0, 0), (14, 14), (16, 16), (18, 18)]


def film_poster_path(instance, filename):
    extension = filename.split(".")[-1]
    path = "films/{}.{}".format(instance.slug, extension)

    if os.path.exists(os.path.join(settings.MEDIA_ROOT, path)):
        os.remove(os.path.join(settings.MEDIA_ROOT, path))
    return path


class Film(models.Model):
    name = models.CharField(max_length=250, null=False, unique=True)
    slug = models.SlugField(null=True)
    description = models.TextField()
    actors = models.ManyToManyField(Actor)
    categories = models.ManyToManyField(Category)
    country = models.ForeignKey(
        Country, null=True, blank=False, on_delete=models.CASCADE
    )
    poster = models.ImageField(null=True, blank=True, upload_to=film_poster_path)
    age_restriction = models.IntegerField(null=False, choices=age_restrictions)
    release_date = models.DateField(null=False)


def film_episode_poster_path(instance, filename):
    extension = filename.split(".")[-1]
    path = "film_episodes/{}.{}".format(instance.slug, extension)
    if os.path.exists(os.path.join(settings.MEDIA_ROOT, path)):
        os.remove(os.path.join(settings.MEDIA_ROOT, path))
    return path


class FilmEpisode(models.Model):
    film = models.ForeignKey(Film, on_delete=models.CASCADE)
    slug = models.SlugField(null=True)
    episode = models.IntegerField(null=False)
    poster = models.ImageField(upload_to=film_episode_poster_path, null=True)
    release_date = models.DateField(null=False)
    link = models.URLField(null=False)
    description = models.TextField()


class RateFilm(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    film = models.ForeignKey(Film, on_delete=models.CASCADE)
    rate = models.IntegerField(
        default=0,
        null=False,
        validators=[MinValueValidator(0), MaxValueValidator(5)],
    )


class RateFilmEpisode(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    film_episode = models.ForeignKey(FilmEpisode, on_delete=models.CASCADE)
    rate = models.IntegerField(
        default=0,
        null=False,
        validators=[MinValueValidator(0), MaxValueValidator(5)],
    )


class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    parent_comment = models.ForeignKey(
        "self", null=True, blank=True, on_delete=models.CASCADE
    )
    content = models.TextField(null=False)
    time = models.DateTimeField(null=False)


class CommentFilm(models.Model):
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE)
    film = models.ForeignKey(Film, on_delete=models.CASCADE)


class CommentFilmEpisode(models.Model):
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE)
    film_episode = models.ForeignKey(FilmEpisode, on_delete=models.CASCADE)


class History(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    film_episode = models.ForeignKey(FilmEpisode, on_delete=models.CASCADE)
    time = models.DateTimeField(null=False)


class Tracking(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    film_episode = models.ForeignKey(FilmEpisode, on_delete=models.CASCADE)
    time = models.IntegerField(default=0, null=False)


class PlayList(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=250, null=False)
    slug = models.SlugField(null=True)


class PlayListEpisode(models.Model):
    play_list = models.ForeignKey(PlayList, on_delete=models.CASCADE)
    film_episode = models.ForeignKey(FilmEpisode, on_delete=models.CASCADE)
    index = models.IntegerField(null=False)
