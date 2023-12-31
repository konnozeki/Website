import csv
from api.models import Actor, Country, Category, Film
from django.utils.text import slugify
from django.core.files.base import ContentFile
import requests


with open("film.csv", "r") as f:
    reader = csv.DictReader(f)
    for row in reader:
        poster = row["poster"]
        extension = poster.split(".")[-1]
        if len(extension) != 3:
            extension = "jpg"
        response = requests.get(poster).content
        actors = []
        actor_names = row["actors"].split("; ")
        for actor in actor_names:
            actors.append(Actor.objects.get(name=actor))
        categories = []
        category_names = row["category"].split("; ")
        for category in category_names:
            if category != "":
                categories.append(Category.objects.get(name=category))
        country = Country.objects.get(name=row["country"])
        release_date = row["release_date"].split("/")
        release_date.reverse()
        release_date = "-".join(release_date)
        slug = slugify(row["name"])
        film = Film.objects.get(
            name=row["name"],
            slug=slug,
            description=row["description"],
            country=country,
            age_restriction=row["age_restriction"],
            release_date=release_date,
        )

        film.poster.save(
            "{}.{}".format(slug, extension),
            ContentFile(response),
            save=True,
        )
        film.save()
        print("add film", row["name"], "to database")
