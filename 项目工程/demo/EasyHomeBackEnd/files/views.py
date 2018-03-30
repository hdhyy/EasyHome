from django.shortcuts import render
from django.views.generic import ListView
from .models import ManagedFile


class FileListView(ListView):
    model = ManagedFile
    template_name = 'files/list_file.html'

