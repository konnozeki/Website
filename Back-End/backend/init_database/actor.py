import csv
from api.models import Actor, Country
from django.utils.text import slugify
from django.core.files.base import ContentFile
import requests


with open("actor.csv", "r") as f:
    reader = csv.DictReader(f)
    for row in reader:
        avatar = row["avatar"]
        extension = avatar.split(".")[-1]

        response = requests.get(avatar).content
        name = row["name"]
        slug = slugify(name)
        description = row["description"]
        gender = row["gender"]
        country = row["country"]
        country = Country.objects.get(name=country)
        actor = Actor.objects.get(
            name=name,
            description=description,
            slug=slug,
            gender=gender,
            country=country,
        )
        actor.avatar.save(
            "{}.{}".format(slug, extension),
            ContentFile (response),
            save=True,
        )
        actor.save()
        print("add", name, "to database")
