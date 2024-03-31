from django.contrib import admin
from . models import User, Chats, Messages

# Register your models here.
admin.site.register(User)
admin.site.register(Chats)
admin.site.register(Messages)

