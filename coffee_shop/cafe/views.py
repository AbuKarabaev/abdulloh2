from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from django.views.decorators.http import require_POST
from django.views.decorators.csrf import csrf_exempt
from .models import Coffee, CartItem, CoffeeOrder
import requests

TELEGRAM_BOT_TOKEN = "7773769474:AAED9waVV3s8quGbjwl8DP_YyuTtvx6qznk"
CHAT_ID = "6903472998"

def send_order_to_bot(phone, address, payment):
    message = (
        f"📢 Новый заказ:\n"
        f"📞 Телефон: {phone}\n"
        f"📍 Адрес: {address}\n"
        f"💳 Оплата: {payment}"
    )
    url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage"
    data = {"chat_id": CHAT_ID, "text": message}
    response = requests.post(url, data=data)
    return response.status_code


def about_view(request):
    """
    Renders the 'О нас' page.
    """
    return render(request, 'cafe/onas.html')

def index(request):
    """
    Renders the home page with the coffee menu.
    """
    coffee_menu = Coffee.objects.all()  # Fetch all coffee items from the database
    return render(request, 'cafe/index.html', {'coffee_menu': coffee_menu})


def cart(request):
    """
    Renders the cart page with all items and the total price.
    """
    cart_items = CartItem.objects.all()
    cart_total = sum(item.price * item.quantity for item in cart_items)
    return render(request, 'cafe/cart.html', {
        'cart_items': cart_items,
        'cart_total': cart_total
    })


@require_POST
def add_to_cart(request):
    """
    Adds a coffee item to the cart. If the item already exists, increments its quantity.
    """
    try:
        coffee_id = request.POST.get('coffee_id')
        if not coffee_id:
            return JsonResponse({'status': 'error', 'message': 'Coffee ID is required'}, status=400)

        coffee = get_object_or_404(Coffee, id=coffee_id)

        # Check if the item is already in the cart
        cart_item, created = CartItem.objects.get_or_create(
            product_name=coffee.name,
            defaults={'price': coffee.price, 'quantity': 1}
        )
        if not created:
            cart_item.quantity += 1
            cart_item.save()

        return JsonResponse({
            'status': 'success',
            'product_name': cart_item.product_name,
            'quantity': cart_item.quantity
        })
    except Exception as e:
        print(f"Error in add_to_cart: {e}")
        return JsonResponse({'status': 'error', 'message': str(e)}, status=400)


@require_POST
def place_order(request):
    """
    API endpoint for placing an order.
    Accepts POST data with name, address, coffee type, and quantity.
    """
    try:
        name = request.POST.get('name')
        address = request.POST.get('address')
        coffee_type = request.POST.get('coffee_type')
        quantity = request.POST.get('quantity')

        # Validate required fields
        if not all([name, address, coffee_type, quantity]):
            return JsonResponse({'status': 'error', 'message': 'All fields are required'}, status=400)

        try:
            quantity = int(quantity)
        except ValueError:
            return JsonResponse({'status': 'error', 'message': 'Quantity must be a number'}, status=400)

        # Create and save the order
        order = CoffeeOrder.objects.create(
            name=name,
            address=address,
            coffee_type=coffee_type,
            quantity=quantity
        )

        return JsonResponse({'status': 'success', 'order_id': order.id})

    except Exception as e:
        return JsonResponse({'status': 'error', 'message': str(e)}, status=500)
