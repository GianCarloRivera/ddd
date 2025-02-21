from django.db import models

class Burger(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    price = models.DecimalField(max_digits=6, decimal_places=2)
    image = models.URLField()

    def __str__(self):
        return self.name

class Order(models.Model):
    items = models.ManyToManyField(Burger)
    total = models.DecimalField(max_digits=8, decimal_places=2)
    status = models.CharField(max_length=20, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Order #{self.id}" 