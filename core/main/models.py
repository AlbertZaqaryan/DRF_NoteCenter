from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=100)

class Product(models.Model):
    category = models.ForeignKey(Category, related_name='products', on_delete=models.CASCADE)
    productName = models.CharField(max_length=100)
    img = models.URLField()
    price = models.IntegerField()
    discount = models.IntegerField()

class Parameter(models.Model):
    product = models.ForeignKey(Product, related_name='parameters', on_delete=models.CASCADE)
    screen = models.CharField(max_length=100)
    cpu = models.CharField(max_length=100)
    ssd = models.CharField(max_length=100)
    ram = models.CharField(max_length=100)
    camera = models.CharField(max_length=100)
    gpu = models.CharField(max_length=100)
