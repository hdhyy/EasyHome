from django.db import models
from django.conf import settings
from django.contrib.auth.models import AbstractUser


def upload_to(instance, filename):
    return '/'.join(['user', instance.nickname, filename])


class User(AbstractUser):
    nickname = models.CharField(max_length=20,blank=True)
    avatar = models.ImageField(upload_to=upload_to)

    class Meta(AbstractUser.Meta):
        pass

    def __str__(self):
        return self.nickname


class AccountInfo(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=20)
    cancellation = models.BooleanField(default=False)

    def __str__(self):
        return self.name


class PersonalInfo(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=20)
    age = models.IntegerField(default=0)
    career = models.CharField(max_length=20, default='null')

    def __str__(self):
        return self.name


