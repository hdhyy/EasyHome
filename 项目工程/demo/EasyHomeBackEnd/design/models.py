from django.db import models
from django.conf import settings
from supervise.models import User


def upload_to(instance, filename):
    return '/'.join(['model', instance.name, filename])


class Model(models.Model):
    name = models.CharField(max_length=20)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    upload_time = models.DateTimeField(auto_now_add=True)
    file = models.FileField(upload_to=upload_to)


class Texture(models.Model):
    name = models.CharField(max_length=20)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    upload_time = models.DateTimeField(auto_now_add=True)
    file = models.FileField(upload_to=upload_to)


class Work(models.Model):
    name = models.CharField(max_length=20)
    generate_time = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    browseNum = models.IntegerField(default=0)
    file = models.FileField(upload_to=upload_to)
