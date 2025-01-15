from django.db import models

class CartItem(models.Model):
    product_name = models.CharField(max_length=255)
    quantity = models.PositiveIntegerField(default=1)
    price = models.DecimalField(max_digits=10, decimal_places=2)

    @property
    def total(self):
        return self.quantity * self.price


class Coffee(models.Model):
    """Модель для кофе"""
    name = models.CharField(max_length=100, verbose_name="Название")
    description = models.TextField(verbose_name="Описание")
    price = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Цена")
    image = models.ImageField(upload_to='coffee_images/', verbose_name="Фото")

    class Meta:
        verbose_name = "Кофе"
        verbose_name_plural = "Кофе"

    def __str__(self):
        return self.name


class CoffeeOrder(models.Model):
    """Модель для заказов клиентов"""
    name = models.CharField(max_length=100, verbose_name="Имя клиента")
    address = models.TextField(verbose_name="Адрес клиента")
    coffee_type = models.CharField(max_length=100, verbose_name="Тип кофе")
    quantity = models.PositiveIntegerField(verbose_name="Количество")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Дата создания")

    class Meta:
        verbose_name = "Заказ кофе"
        verbose_name_plural = "Заказы кофе"
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.name} заказал {self.coffee_type} ({self.quantity})"
