from django.contrib import messages
from django.shortcuts import render, redirect
from django.urls import reverse
from django.http import HttpResponseRedirect, HttpResponse
from django.views.generic import ListView, DetailView, FormView, CreateView, TemplateView
from .forms import UploadFileForm, ModelsForm, TexturesForm, WorksForm
from .models import Model, Texture, Work, IndoorType


class ThanksView(TemplateView):
    template_name = 'design/thanks.html'


class PaginationListView(ListView):
    paginate_by = 6

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        paginator = context.get('paginator')
        page = context.get('page_obj')
        is_paginated = context.get('is_paginated')
        pagination_data = self.pagination_data(paginator, page, is_paginated)
        context.update(pagination_data)
        return context

    def pagination_data(self, paginator, page, is_paginated):
        if not is_paginated:
            return {}
        left = []
        right = []
        left_has_more = False
        right_has_more = False
        first = False
        last = False
        page_number = page.number
        total_pages = paginator.num_pages
        page_range = paginator.page_range
        if page_number == 1:
            right = page_range[page_number:page_number + 2]
            if right[-1] < total_pages - 1:
                right_has_more = True
            if right[-1] < total_pages:
                last = True
        elif page_number == total_pages:
            left = page_range[(page_number - 3) if (page_number - 3) > 0 else 0:page_number - 1]
            if left[0] > 2:
                left_has_more = True
            if left[0] > 1:
                first = True
        else:
            left = page_range[(page_number - 3) if (page_number - 3) > 0 else 0:page_number - 1]
            right = page_range[page_number:page_number + 2]
            if right[-1] < total_pages - 1:
                right_has_more = True
            if right[-1] < total_pages:
                last = True
            if left[0] > 2:
                left_has_more = True
            if left[0] > 1:
                first = True

        data = {
            'left': left,
            'right': right,
            'left_has_more': left_has_more,
            'right_has_more': right_has_more,
            'first': first,
            'last': last,
        }
        return data


class ModelAddView(FormView):
    form_class = ModelsForm
    template_name = 'design/add_model.html'
    success_url = '/thanks'

    def form_invalid(self, form):  # 定义表对象没有添加失败后跳转到的页面。
        return HttpResponse("form is invalid.. this is just an HttpResponse object")

    def form_valid(self, form):
        form.instance.user = self.request.user
        form.save()
        return self.get_success_url()

    def get_success_url(self):
        messages.success(self.request, 'Model Added Successfully')
        return HttpResponseRedirect(reverse('design:thanks'))


class TextureAddView(FormView):
    form_class = TexturesForm
    template_name = 'design/add_texture.html'
    success_url = '/thanks'

    def form_valid(self, form):
        form.instance.user = self.request.user
        form.save()
        return self.get_success_url()

    def get_success_url(self):
        messages.success(self.request, 'Texture Added Successfully')
        return HttpResponseRedirect(reverse('design:thanks'))


class TextureListView(PaginationListView):
    module = Texture
    template_name = 'design/list_textures.html'
    context_object_name = "texture_list"

    def get_queryset(self):
        if self.kwargs:
            return Texture.objects.filter(user_id=self.kwargs['user_id']).order_by('id')
        else:
            return Texture.objects.all().order_by('id')


class ModelDetailView(DetailView):
    model = Model
    template_name = 'design/see_model.html'


class TextureDetailView(DetailView):
    model = Texture
    template_name = 'design/see_texture.html'


class ModelTestView(DetailView):
    model = Model
    template_name = 'design/objloaderdemo.html'


class ModelListView(PaginationListView):
    module = Model
    template_name = 'design/list_models.html'
    context_object_name = "model_list"

    def get_queryset(self):
        if self.kwargs:
            return Model.objects.filter(user_id=self.kwargs['user_id']).order_by('id')
        else:
            return Model.objects.all().order_by('id')


def upload_file(request):
    if request.method == 'POST':
        form = UploadFileForm(request.POST, request.FILES)
        if form.is_valid():
            handle_uploaded_file(request.FILES['file'])
            return HttpResponseRedirect('/success/url/')
    else:
        form = UploadFileForm()
    return render(request, 'design/upload.html', {'form': form})


def handle_uploaded_file(file):
    with open('some/file/name.txt', 'wb+') as destination:
        for chunk in file.chunks():
            destination.write(chunk)


def designface(request):
    return render(request, 'design/design.html')


class DesignFaceView(DetailView):
    template_name = 'design/design.html'
    model = IndoorType
    context_object_name = 'indoortype'


class WorkAddView(FormView):
    form_class = WorksForm
    template_name = 'design/add_work.html'
    success_url = '/thanks'

    def form_invalid(self, form):  # 定义表对象没有添加失败后跳转到的页面。
        return HttpResponse("form is invalid.. this is just an HttpResponse object")

    def form_valid(self, form):
        form.instance.user = self.request.user
        form.save()
        return self.get_success_url()

    def get_success_url(self):
        messages.success(self.request, 'Work Added Successfully')
        return HttpResponseRedirect(reverse('design:thanks'))


class WorkListView(PaginationListView):
    module = Work
    template_name = 'design/list_works.html'
    context_object_name = "work_list"

    def get_queryset(self):
        if self.kwargs:
            return Work.objects.filter(user_id=self.kwargs['user_id']).order_by('id')
        else:
            return Work.objects.all().order_by('id')


class WorkDetailView(DetailView):
    model = Work
    template_name = 'design/see_work.html'


