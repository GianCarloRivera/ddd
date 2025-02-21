from django.contrib import admin
from .models import Burger, Order

@admin.register(Burger)
class BurgerAdmin(admin.ModelAdmin):
    list_display = ('name', 'price')
    search_fields = ('name', 'description')

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'total', 'status', 'created_at')
    list_filter = ('status', 'created_at') 