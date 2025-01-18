from django.db import models

class CartItem(models.Model):
    """Model representing an item in the shopping cart."""
    product_name = models.CharField(max_length=255, verbose_name="Наименование продукта")
    quantity = models.PositiveIntegerField(default=1, verbose_name="Количество")
    price = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Цена за единицу")

    @property
    def total(self):
        """Calculates the total cost of the cart item."""
        return self.quantity * self.price

    def __str__(self):
        return f"{self.quantity} x {self.product_name} @ {self.price}"

    class Meta:
        verbose_name = "Элемент корзины"
        verbose_name_plural = "Элементы корзины"

class Coffee(models.Model):
    """Model representing coffee details."""
    name = models.CharField(max_length=100, verbose_name="Название")
    description = models.TextField(verbose_name="Описание")
    price = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Цена")
    image = models.ImageField(upload_to='coffee_images/', verbose_name="Фото")

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Кофе"
        verbose_name_plural = "Кофе"

class CoffeeOrder(models.Model):
    """Model representing a customer's coffee order."""
    name = models.CharField(max_length=100, verbose_name="Имя клиента")
    address = models.TextField(verbose_name="Адрес клиента")
    coffee_type = models.CharField(max_length=100, verbose_name="Тип кофе")
    quantity = models.PositiveIntegerField(verbose_name="Количество")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Дата создания")

    def __str__(self):
        return f"{self.name} заказал {self.coffee_type} ({self.quantity} шт.)"

    class Meta:
        verbose_name = "Заказ кофе"
        verbose_name_plural = "Заказы кофе"
        ordering = ['-created_at']
