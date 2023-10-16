from django.db import models
from django.contrib.auth.models import User
# Create your models here.


gender_type = ["male", "female", "other"]


class Category(models.Model):
    name = models.CharField(max_length=50, null=False, unique=True)
    description = models.TextField()
    slug = models.SlugField()


class Actor(models.Model):
    name = models.CharField(max_length=50, blank=False, null=False, unique=True)
    description = models.TextField()
    slug = models.SlugField()
    gender = models.CharField(max_length=6, choices=gender_type, null=False, blank=False, default="other")
    Country = models.CharField(max_length=50)
    avatar = models.ImageField()


class UserProfile(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, blank=False, null=False)
    birth = models.DateField(null=False, blank=False)
    gender = models.CharField(max_length=6, choices=gender_type, null=False, blank=False, default="other")
    avatar = models.ImageField()
    favourite_category = models.ManyToManyField(Category)
    favourite_actor = models.ManyToManyField(Actor)


class FilmEpisode(models.Model):
    film = models.ForeignKey(Film)
    slug = models.SlugField()
    episode = models.IntegerField(null=False)
    avatar = models.ImageField(null=True)
    release_date = models.DateField(null=False)
    link = models.URLField(null=False)
    description = models.TextField()


age_restrictions = [0, 14, 16, 18]


class Film(models.Model):
    name = models.CharField(max_length=250, null=False)
    slug = models.SlugField()
    description = models.TextField()
    actors = models.ManyToManyField(Actor)
    category = models.ManyToManyField(Category)
    avatar = models.ImageField()
    age_restriction = models.IntegerField(null=False, choices=age_restrictions)
    release_date = models.DateField(null=False)
    trailer = models.ForeignKey(FilmEpisode)
    expisode = models.ManyToManyField(FilmEpisode)


class RateFilm(models.Model):
    user = models.ForeignKey(User)
    film = models.ForeignKey(Film)
    rate = models.IntegerField(default=0, null=False)


class RateFilmEpisode(models.Model):
    user = models.ForeignKey(User)
    filmEpisode = models.ForeignKey(FilmEpisode)
    rate = models.IntegerField(default=0, null=False)


class Comment(models.Model):
    user = models.ForeignKey(User)
    parent_comment = models.ForeignKey(Film, null=True)
    content = models.TextField(null=False)
    time = models.DateTimeField(null=False)


class CommentFilm(models.Model):
    comment = models.ForeignKey(Comment)
    film = models.ForeignKey(Film)


class CommentFilmEpisode(models.Model):
    comment = models.ForeignKey(Comment)
    film_episode = models.ForeignKey(FilmEpisode)


class History(models.Model):
    user = models.ForeignKey(User)
    film_episode = models.ForeignKey(FilmEpisode)
    time = models.DateTimeField(null=False)


class Tracking(models.Model):
    user = models.ForeignKey(User)
    film_episode = models.ForeignKey(FilmEpisode)
    time = models.TimeField(default=0, null=False)


class PlayList(models.Model):
    user = models.ForeignKey(User)
    name = models.CharField(max_length=250, null=False)
    slug = models.SlugField()


class PlayListEpisode(models.Model):
    play_list = models.ForeignKey(PlayList)
    file_episode = models.ForeignKey(FilmEpisode)
    index = models.IntegerField(null=False)