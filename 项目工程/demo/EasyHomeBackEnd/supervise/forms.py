#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""python doc"""

__author__ = 'Di Hua'

from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from django.forms import ModelForm
from .models import User


class RegisterForm(UserCreationForm):
    class Meta(UserCreationForm.Meta):
        model = User
        fields = ("username", "email")


class UpdateUserForm(ModelForm):
    class Meta:
        model = User
        exclude = ['password']

