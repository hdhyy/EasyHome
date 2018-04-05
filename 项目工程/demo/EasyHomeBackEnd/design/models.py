from django.db import models
from django.conf import settings
from supervise.models import User


def upload_to(instance, filename):
    return '/'.join([str(instance.getdicname()), instance.name, filename])


class Model(models.Model):
    name = models.CharField(max_length=20)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    upload_time = models.DateTimeField(auto_now_add=True)
    file = models.FileField(upload_to=upload_to)

    def getdicname(self):
        return 'model'


class Texture(models.Model):
    name = models.CharField(max_length=20)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    upload_time = models.DateTimeField(auto_now_add=True)
    file = models.FileField(upload_to=upload_to)

    def getdicname(self):
        return 'texture'


class Work(models.Model):
    name = models.CharField(max_length=20)
    generate_time = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    browseNum = models.IntegerField(default=0)
    file = models.FileField(upload_to=upload_to)

    def getdicname(self):
        return 'work'


class IndoorType(models.Model):
    name = models.CharField(max_length=20)
    room = models.IntegerField(default=0)
    office = models.IntegerField(default=0)
    kitchen = models.IntegerField(default=0)
    bathroom = models.IntegerField(default=0)
    file = models.FileField(upload_to=upload_to)

    def getdicname(self):
        return 'indoorType'
