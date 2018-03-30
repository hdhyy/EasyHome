from django.shortcuts import render, redirect
from django.views.generic import DetailView, UpdateView
from django.contrib import messages
from django.http import HttpResponseRedirect
from django.urls import reverse
from .models import User, AccountInfo, PersonalInfo
from .forms import RegisterForm, UpdateUserForm


def register(request):
    # 从 get 或者 post 请求中获取 next 参数值
    # get 请求中，next 通过 url 传递，即 /?next=value
    # post 请求中，next 通过表单传递，即 <input type="hidden" name="next" value="{{ next }}"/>
    redirect_to = request.POST.get('next', request.GET.get('next', ''))
    # 只有当请求为 POST 时，才表示用户提交了注册信息
    if request.method == 'POST':
        # request.POST 是一个类字典数据结构，记录了用户提交的注册信息
        # 这里提交的就是用户名（username）、密码（password）、邮箱（email）
        # 用这些数据实例化一个用户注册表单
        form = RegisterForm(request.POST)

        # 验证数据的合法性
        if form.is_valid():
            # 如果提交数据合法，调用表单的 save 方法将用户数据保存到数据库
            form.save()

            # 注册成功，跳转回首页
            if redirect_to:
                return redirect(redirect_to)
            else:
                return redirect('/')
    else:
        # 请求不是 POST，表明用户正在访问注册页面，展示一个空的注册表单给用户
        form = RegisterForm()

    # 渲染模板
    # 如果用户正在访问注册页面，则渲染的是一个空的注册表单
    # 如果用户通过表单提交注册信息，但是数据验证不合法，则渲染的是一个带有错误信息的表单
        return render(request, 'supervise/register.html', context={'form': form, 'next': redirect_to})


class UserDetailView(UpdateView):
    form_class = UpdateUserForm
    template_name = 'supervise/my_info.html'
    template_name_suffix = '_update_form'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['accountInfo'] = AccountInfo.objects.filter(user_id=self.kwargs['pk'])
        context['personalInfo'] = PersonalInfo.objects.filter(user_id=self.kwargs['pk'])
        return context

    def get_queryset(self):
        return User.objects.filter(id=self.kwargs['pk'])

    def form_valid(self, form):
        form.save()
        return self.get_success_url()

    def get_success_url(self):
        messages.success(self.request, 'User Updated Successfully')
        return HttpResponseRedirect(reverse('design:thanks'))
