from django.contrib import admin

# Register your models here.
from .models import *

admin.site.register(Category)
admin.site.register(Country)
admin.site.register(Actor)
admin.site.register(UserProfile)
admin.site.register(Film)
admin.site.register(FilmEpisode)
admin.site.register(RateFilm)
admin.site.register(RateFilmEpisode)
admin.site.register(Comment)
admin.site.register(CommentFilm)
admin.site.register(CommentFilmEpisode)
admin.site.register(History)
admin.site.register(Tracking)
admin.site.register(PlayList)
admin.site.register(PlayListEpisode)


