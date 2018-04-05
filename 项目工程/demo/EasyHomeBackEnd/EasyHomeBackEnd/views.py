from django.shortcuts import render
from django.views.generic import ListView
from design.models import IndoorType


def index(request):
    return render(request, 'index.html')


class IndexView(ListView):
    model = IndoorType
    template_name = 'index.html'
    context_object_name = "indoortype_list"

    def get_queryset(self):
        return IndoorType.objects.order_by('id')
