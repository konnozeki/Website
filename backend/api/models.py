from django.db import models
from django.contrib.auth.models import User
# Create your models here.


gender_type = [{"M" , "Male"}, {"F" , "Female"}, {"O" , "Other"}]


class Category(models.Model):
    name = models.CharField(max_length=50, null=False, unique=True)
    description = models.TextField()
    slug = models.SlugField()

class Country(models.Model): 
    country_name = models.CharField(max_length=250, null=False, blank=False)
    country_flag = models.URLField(null=False)




class Actor(models.Model):
    name = models.CharField(max_length=50, blank=False, null=False, unique=True)
    description = models.TextField()
    slug = models.SlugField()
    gender = models.CharField(max_length=6, choices=gender_type, null=False, blank=False, default="Other")
    country = models.ForeignKey(Country, null=False, blank=False, on_delete=models.CASCADE)
    avatar = models.ImageField()


class UserProfile(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, blank=False, null=False, primary_key=True)
    birth = models.DateField(null=False, blank=False)
    gender = models.CharField(max_length=6, choices=gender_type, null=False, blank=False, default="Other")
    avatar = models.ImageField()
    favourite_category = models.ManyToManyField(Category)
    favourite_actor = models.ManyToManyField(Actor)

age_restrictions = [(0, 0), (14, 14), (16, 16), (18, 18)]


class Film(models.Model):
    name = models.CharField(max_length=250, null=False, primary_key=True)
    slug = models.SlugField()
    description = models.TextField()
    actors = models.ManyToManyField(Actor)
    category = models.ManyToManyField(Category)
    avatar = models.ImageField()
    age_restriction = models.IntegerField(null=False, choices=age_restrictions)
    release_date = models.DateField(null=False)


class FilmEpisode(models.Model):
    film = models.ForeignKey(Film, on_delete=models.CASCADE)
    slug = models.SlugField()
    episode = models.IntegerField(null=False)
    avatar = models.ImageField(null=True)
    release_date = models.DateField(null=False)
    link = models.URLField(null=False)
    description = models.TextField()




class RateFilm(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    film = models.ForeignKey(Film, on_delete=models.CASCADE)
    rate = models.IntegerField(default=0, null=False)


class RateFilmEpisode(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    film_episode = models.ForeignKey(FilmEpisode, on_delete=models.CASCADE)
    rate = models.IntegerField(default=0, null=False)


class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    parent_comment = models.ForeignKey(Film, null=True, on_delete=models.CASCADE)
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
    time = models.TimeField(default=0, null=False)


class PlayList(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=250, null=False)
    slug = models.SlugField()


class PlayListEpisode(models.Model):
    play_list = models.ForeignKey(PlayList, on_delete=models.CASCADE)
    film_episode = models.ForeignKey(FilmEpisode, on_delete=models.CASCADE)
    index = models.IntegerField(null=False)




            

