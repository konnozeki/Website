from django.shortcuts import render
from django.shortcuts import redirect


# Create your views here.
def home(request):
    return redirect("/home")


def front(request):
    context = {}
    return render(request, "index.html", context)
