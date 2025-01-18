from django.contrib import admin
from .models import CartItem, Coffee, CoffeeOrder

# Custom admin interface for CartItem
class CartItemAdmin(admin.ModelAdmin):
    # Display specific fields in the admin list view
    list_display = ('product_name', 'quantity', 'price', 'total')
    # Enable filtering by product_name
    list_filter = ('product_name',)
    # Enable searching by product_name
    search_fields = ('product_name',)
    # Set default sorting
    ordering = ('product_name',)

# Custom admin interface for Coffee
class CoffeeAdmin(admin.ModelAdmin):
    # Display fields in the admin list view
    list_display = ('name', 'price', 'description')
    # Add a filter sidebar for price
    list_filter = ('price',)
    # Add search functionality based on name and description
    search_fields = ('name', 'description')
    # Customize the form layout (optional, for example purposes)
    fieldsets = (
        (None, {
            'fields': ('name', 'description', 'price', 'image')
        }),
    )

# Custom admin interface for CoffeeOrder
class CoffeeOrderAdmin(admin.ModelAdmin):
    # Display fields in the admin list view
    list_display = ('name', 'coffee_type', 'quantity', 'address', 'created_at')
    # Enable filtering by date and coffee_type
    list_filter = ('created_at', 'coffee_type')
    # Enable searching by name and coffee_type
    search_fields = ('name', 'coffee_type', 'address')
    # Set up a hierarchical date navigation
    date_hierarchy = 'created_at'

# Register the models with their respective admin classes
admin.site.register(CartItem, CartItemAdmin)
admin.site.register(Coffee, CoffeeAdmin)
admin.site.register(CoffeeOrder, CoffeeOrderAdmin)
