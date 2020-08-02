from django.urls import path, re_path, include
from .views import SignUpView


urlpatterns = [
    path('signup', SignUpView.as_view())

]
