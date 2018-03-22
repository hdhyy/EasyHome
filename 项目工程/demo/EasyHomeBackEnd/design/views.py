from django.shortcuts import render, redirect


def designface(request):
    return render(request,'design/interactivedemo.html')
