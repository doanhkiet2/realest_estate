from django.urls import path, re_path, include
from .views import ContactCreateView
urlpatterns = [
    path('', ContactCreateView.as_view())
]
