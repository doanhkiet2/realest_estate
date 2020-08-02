from django.contrib import admin
from .models import Contact
# Register your models here.


class ContactAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'subject','message')
    list_display_link = ('name', 'email')
    search_fields = ('name', 'email')
    item_per_page =25

admin.site.register(Contact, ContactAdmin)