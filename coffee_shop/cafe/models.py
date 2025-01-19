from django.db import models


class CartItem(models.Model):
    """Model representing an item in the shopping cart."""
    product_name = models.CharField(
        max_length=255, verbose_name="Наименование продукта"
    )
    quantity = models.PositiveIntegerField(
        default=1, verbose_name="Количество"
    )
    price = models.DecimalField(
        max_digits=10, decimal_places=2, verbose_name="Цена за единицу"
    )
    added_at = models.DateTimeField(
        auto_now_add=True, verbose_name="Добавлено в корзину"
    )

    @property
    def total(self):
        """Calculates the total cost of the cart item."""
        return self.quantity * self.price

    def __str__(self):
        return f"{self.quantity} x {self.product_name} @ {self.price}"

    class Meta:
        verbose_name = "Элемент корзины"
        verbose_name_plural = "Элементы корзины"
        ordering = ['-added_at']


class Coffee(models.Model):
    """Model representing coffee details."""
    name = models.CharField(max_length=100, verbose_name="Название")
    description = models.TextField(verbose_name="Описание")
    price = models.DecimalField(
        max_digits=10, decimal_places=2, verbose_name="Цена"
    )
    image = models.ImageField(
        upload_to="coffee_images/", verbose_name="Фото"
    )
    available = models.BooleanField(
        default=True, verbose_name="Доступен для заказа"
    )

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Кофе"
        verbose_name_plural = "Кофе"
        ordering = ["name"]

    def get_discounted_price(self, discount_percent: float):
        """Calculate discounted price based on percentage."""
        if 0 <= discount_percent <= 100:
            return round(self.price - (self.price * discount_percent / 100), 2)
        return self.price

class CoffeeOrder(models.Model):
    name = models.CharField(max_length=100, verbose_name="Имя клиента")
    coffee_type = models.CharField(max_length=100, verbose_name="Тип кофе")
    quantity = models.PositiveIntegerField(verbose_name="Количество")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Дата создания")

    @property
    def total_price(self):
        # Допустим, цена фиксирована для теста (или получите ее из другого источника)
        price_per_unit = 100  # Цена за единицу (пример)
        return self.quantity * price_per_unit

    def __str__(self):
        return f"{self.name} заказал {self.coffee_type} ({self.quantity} шт.)"
