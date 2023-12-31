import csv
from api.models import Film, FilmEpisode
from django.utils.text import slugify
from django.core.files.base import ContentFile
import requests


with open("film_episodes.csv", "r") as f:
    reader = csv.DictReader(f)
    for row in reader:
        film = Film.objects.get(
            name=row["film"],
        )
        poster = "http://127.0.0.1:8000" + film.poster.url
        extension = poster.split(".")[-1]
        if len(extension) != 3:
            extension = "jpg"
        response = requests.get(poster).content
        episode = int(row["episode"])
        slug = "{}-{}".format(film.slug, episode)
        release_date = row["release_date"].split("/")
        release_date.reverse()
        release_date = "-".join(release_date)
        film_episode = FilmEpisode.objects.create(
            film=film,
            slug=slug,
            episode=episode,
            release_date=release_date,
            link=row["link"],
            description=row["description"],
        )

        film_episode.poster.save(
            "{}.{}".format(slug, extension),
            ContentFile(response),
            save=True,
        )
        film.save()
        print("add film", row["film"], "to database")
