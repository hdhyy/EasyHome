import markdown
from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse
from .models import Post, Category


def index(request):
    post_list = Post.objects.all().order_by('-created_time')
    return render(request, 'community/index.html', context={'post_list': post_list})


def detail(request,pk):
    post = get_object_or_404(Post, pk=pk)
    # 引入 markdown 模块
    post.body = markdown.markdown(post.body,
                                  extensions=[
                                      'markdown.extensions.extra',
                                      'markdown.extensions.codehilite',
                                      'markdown.extensions.toc',
                                  ])
    return render(request, 'community/detail.html', context={'post': post})


def archives(request, year, month):
    post_list = Post.objects.filter(created_time__year=year,
                                    created_time__month=month
                                    ).order_by('-created_time')
    return render(request, 'community/index.html', context={'post_list': post_list})


def category(request, pk):
    # 导入 Category 类
    cate = get_object_or_404(Category, pk=pk)
    post_list = Post.objects.filter(category=cate).order_by('-created_time')
    return render(request, 'community/index.html', context={'post_list': post_list})