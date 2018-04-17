#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""python doc"""

__author__ = 'Di Hua'

from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils import timezone


def upload_to(instance, filename):
    return '/'.join(['user', instance.nickname, filename])


class User(AbstractUser):
    nickname = models.CharField(max_length=20, blank=True)
    avatar = models.ImageField(upload_to=upload_to, default=None)

    class Meta(AbstractUser.Meta):
        pass

    def __str__(self):
        return self.nickname


class AccountInfo(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=20)
    last_login_time = models.DateTimeField(default=timezone.now)
    last_login_ip = models.CharField(max_length=15, default='0.0.0.0')
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
