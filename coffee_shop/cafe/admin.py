from django.contrib import admin
from .models import Coffee, CoffeeOrder


@admin.register(Coffee)
class CoffeeAdmin(admin.ModelAdmin):
    """Администрирование кофе"""
    list_display = ('name', 'price', 'description')
    search_fields = ('name', 'description')
    fields = ('name', 'description', 'price', 'image')


@admin.register(CoffeeOrder)
class CoffeeOrderAdmin(admin.ModelAdmin):
    """Администрирование заказов кофе"""
    list_display = ('name', 'coffee_type', 'quantity', 'created_at')
    list_filter = ('created_at', 'coffee_type')  # Фильтры в правой панели
    search_fields = ('name', 'coffee_type')  # Поля для поиска
    fields = ('name', 'address', 'coffee_type', 'quantity')  # Порядок отображения полей
    ordering = ['-created_at']  # Упорядочивание записей в списке заказов
    readonly_fields = ['created_at']  # Поле `created_at` только для чтения
