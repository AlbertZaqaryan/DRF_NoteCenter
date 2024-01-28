from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Brand(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Color(models.Model):
    name = models.CharField(max_length=10)

    def __str__(self):
        return self.name

class Product(models.Model):
    category = models.ForeignKey(Category, related_name='products', on_delete=models.CASCADE)
    brand = models.ForeignKey(Brand, related_name='products', on_delete=models.CASCADE)
    productName = models.CharField(max_length=100)
    img = models.ImageField(upload_to='images')
    price = models.IntegerField()
    discount = models.IntegerField()
    colors = models.ManyToManyField(Color)


    def __str__(self):
        return self.productName

class Parameter(models.Model):
    product = models.ForeignKey(Product, related_name='parameters', on_delete=models.CASCADE)
    screen = models.CharField(max_length=100)
    cpu = models.CharField(max_length=100)
    ssd = models.CharField(max_length=100)
    ram = models.CharField(max_length=100)
    camera = models.CharField(max_length=100)
    gpu = models.CharField(max_length=100)
