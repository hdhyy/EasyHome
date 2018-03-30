from django import forms
from .models import Model


class ModelsForm(forms.ModelForm):
    class Meta:
        model = Model
        fields = ['name', 'file']


class UploadFileForm(forms.Form):
    title = forms.CharField(max_length=50)
    file = forms.FileField()
