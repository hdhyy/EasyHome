from django.contrib import admin
from .models import User


class UserAdmin(admin.ModelAdmin):

    list_display = ('username', 'email', 'date_joined', 'is_superuser')
    search_fields = ['username']
    list_filter = ['date_joined']


admin.site.register(User, UserAdmin)
