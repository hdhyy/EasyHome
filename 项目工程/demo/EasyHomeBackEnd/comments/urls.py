from django.conf.urls import url
from django.urls import path
from . import views

app_name = 'comments'
urlpatterns = [
    path('post/<int:post_pk>', views.post_comment, name='post_comment'),
]
