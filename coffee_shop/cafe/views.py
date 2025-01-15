from django.shortcuts import render, redirect
from django.http import JsonResponse
from .models import Coffee, CoffeeOrder
from django.shortcuts import render

from django.shortcuts import render
from django.http import JsonResponse
from .models import CartItem
from django.shortcuts import render
from .models import CartItem

def cart(request):
    """Представление корзины"""
    cart_items = CartItem.objects.all()  # Получение всех элементов корзины
    cart_total = sum(item.price * item.quantity for item in cart_items)  # Общая сумма
    return render(request, 'cart.html', {'cart_items': cart_items, 'cart_total': cart_total})

def cart_view(request):
    cart_items = CartItem.objects.all()  # Example query
    cart_total = sum(item.price * item.quantity for item in cart_items)
    return render(request, 'cart.html', {
        'cart_items': cart_items,
        'cart_total': cart_total,
    })



def index(request):
    """Главная страница с меню"""
    coffee_menu = Coffee.objects.all()  # Получение всех записей из модели Coffee
    return render(request, 'cafe/index.html', {'coffee_menu': coffee_menu})


def register(request):
    """Страница регистрации заказа"""
    if request.method == 'POST':
        # Получение данных из формы
        name = request.POST.get('name')
        address = request.POST.get('address')
        coffee_type = request.POST.get('coffee_type')
        quantity = request.POST.get('quantity')

        # Сохранение данных в базу
        CoffeeOrder.objects.create(
            name=name,
            address=address,
            coffee_type=coffee_type,
            quantity=quantity
        )

        return redirect('index')  # Перенаправление на главную страницу после успешной регистрации заказа
    return render(request, 'cafe/register.html')


def place_order(request):
    """API для оформления заказа"""
    if request.method == 'POST':
        # Получение данных из формы
        name = request.POST.get('name')
        address = request.POST.get('address')
        coffee_type = request.POST.get('coffee_type')
        quantity = int(request.POST.get('quantity'))

        # Сохранение данных в базу
        order = CoffeeOrder.objects.create(
            name=name,
            address=address,
            coffee_type=coffee_type,
            quantity=quantity
        )

        # Возврат успешного ответа
        return JsonResponse({'status': 'success', 'order_id': order.id})

    return JsonResponse({'status': 'error', 'message': 'Метод запроса не поддерживается'}, status=400)
