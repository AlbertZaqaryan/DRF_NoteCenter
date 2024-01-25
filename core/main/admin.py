from django.contrib import admin
from .models import Product, Category, Parameter
# Register your models here.


admin.site.register(Product)
admin.site.register(Category)
admin.site.register(Parameter)
