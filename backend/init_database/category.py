import csv
from api.models import Category
from django.utils.text import slugify

with open("category.csv", "r") as f:
    reader = csv.DictReader(f)
    for row in reader:
        Category.objects.create(
            name=row["name"], description=row["description"], slug=slugify(row["name"])
        )
