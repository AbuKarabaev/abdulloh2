from django.contrib import admin
from .models import Coffee, CartItem, CoffeeOrder

@admin.register(Coffee)
class CoffeeAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'available')
    list_filter = ('available',)
    search_fields = ('name',)

@admin.register(CartItem)
class CartItemAdmin(admin.ModelAdmin):
    list_display = ('product_name', 'quantity', 'price', 'added_at')
    search_fields = ('product_name',)

@admin.register(CoffeeOrder)
class CoffeeOrderAdmin(admin.ModelAdmin):
    list_display = ('name', 'coffee_type', 'quantity', 'total_price', 'created_at')
    search_fields = ('name', 'coffee_type__name')
    list_filter = ('created_at',)
