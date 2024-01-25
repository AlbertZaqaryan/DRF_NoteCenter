from rest_framework import serializers
from .models import Category, Product, Parameter

class ParameterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Parameter
        fields = ('screen', 'cpu', 'ssd', 'ram', 'camera', 'gpu', 'color')

class ProductSerializer(serializers.ModelSerializer):
    parameters = ParameterSerializer(many=True)

    class Meta:
        model = Product
        fields = ('productName', 'img', 'price', 'discount', 'parameters')

class CategorySerializer(serializers.ModelSerializer):
    products = ProductSerializer(many=True)

    class Meta:
        model = Category
        fields = ('name', 'products')
