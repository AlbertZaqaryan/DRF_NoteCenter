from rest_framework import serializers
from .models import Category, Product, Parameter, Color, Brand

class ParameterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Parameter
        fields = ('screen', 'cpu', 'ssd', 'ram', 'camera', 'gpu')


class ColorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Color
        fields = ('name', )

class ProductSerializer(serializers.ModelSerializer):
    parameters = ParameterSerializer(many=True)
    colors = ColorSerializer(many=True, read_only=True)


    class Meta:
        model = Product
        fields = ('id', 'productName', 'img', 'price', 'discount', 'parameters', 'colors')

class CategorySerializer(serializers.ModelSerializer):
    products = ProductSerializer(many=True)

    class Meta:
        model = Category
        fields = ('name', 'products')


class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = ('id', 'name')
