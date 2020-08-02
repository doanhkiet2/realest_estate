from django.db import models
from datetime import datetime
# Create your models here.

class Contact (models.Model):
    name = models.CharField(max_length=200)
    email = models.CharField(max_length=100)
    subject = models.CharField(max_length=100)
    message = models.TextField(blank=True)
    contact_time = models.DateTimeField(auto_now_add=True, blank=True)

    def __str__(self):
        return self.email