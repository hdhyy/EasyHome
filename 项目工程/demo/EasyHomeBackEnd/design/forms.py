from django import forms
from .models import Model, Texture, Work


class ModelsForm(forms.ModelForm):
    class Meta:
        model = Model
        fields = ['name', 'file']


class TexturesForm(forms.ModelForm):
    class Meta:
        model = Texture
        fields = ['name', 'file']


class WorksForm(forms.ModelForm):
    class Meta:
        model = Work
        fields = ['name', 'file']


class UploadFileForm(forms.Form):
    title = forms.CharField(max_length=50)
    file = forms.FileField()
