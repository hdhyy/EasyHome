"""EasyHomeBackEnd URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path
from django.conf import settings
from django.conf.urls.static import static
from community.feeds import AllPostsRssFeed
from . import views

urlpatterns = [
                  path('', views.IndexView.as_view(), name='index'),
                  path('admin/', admin.site.urls),
                  path('polls/', include('polls.urls')),
                  path('supervise/', include('supervise.urls')),
                  path('community/', include('community.urls')),
                  path('comments/', include('comments.urls')),
                  path('design/', include('design.urls')),
                  path('supervise/', include('django.contrib.auth.urls')),
                  path('all/rss/', AllPostsRssFeed(), name='rss'),
                  path('search/', include('haystack.urls')),
              ]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
