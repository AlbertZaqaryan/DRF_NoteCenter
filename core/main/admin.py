from django.contrib import admin
from .models import Product, Category, Parameter, Color
# Register your models here.

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):

    list_display = ['id', 'name']
    list_display_links = ['name']
    search_fields = ['name']

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):

    list_display = ['id', 'productName', 'price']
    list_display_links = ['productName']
    search_fields = ['productName', 'price']

@admin.register(Parameter)
class ProductAdmin(admin.ModelAdmin):

    search_fields = ['screen', 'cpu', 'ssd', 'ram', 'camera', 'gpu', 'color']

admin.site.register(Color)