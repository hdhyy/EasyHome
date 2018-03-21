from django.db import models


class Model(models.Model):
    name = models.CharField(max_length=20)
    upload_time = models.DateTimeField(auto_now_add=True)


class Texture(models.Model):
    name = models.CharField(max_length=20)


class Work(models.Model):
    name = models.CharField(max_length=20)
    issue_time = models.DateTimeField(auto_now_add=True)

