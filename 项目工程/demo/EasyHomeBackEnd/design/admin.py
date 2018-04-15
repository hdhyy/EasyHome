from django.contrib import admin
from .models import Model, ModelType, FurnitureType, Texture,Work, SceneType


admin.site.register(Model)
admin.site.register(ModelType)
admin.site.register(FurnitureType)
admin.site.register(Texture)
admin.site.register(Work)
admin.site.register(SceneType)
