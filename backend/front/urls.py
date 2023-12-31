from django.urls import path
from front.views import *


urlpatterns = [
    path("", front),
    path("home", front),
    path("watch", front),
]
