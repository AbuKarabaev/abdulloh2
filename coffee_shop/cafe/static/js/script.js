document.addEventListener('DOMContentLoaded', () => {
    const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]')?.value;

    document.querySelectorAll('.add-to-cart').forEach((button) => {
        button.addEventListener('click', async () => {
            const coffeeId = button.getAttribute('data-id');

            try {
                const response = await fetch('/add_to_cart/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'X-CSRFToken': csrfToken,
                    },
                    body: new URLSearchParams({ coffee_id: coffeeId }),
                });

                const data = await response.json();

                if (data.status === 'success') {
                    // alert(`Добавлено: ${data.product_name}, Количество: ${data.quantity}`);
                } else {
                    alert(`Ошибка: ${data.message}`);
                }
            } catch (error) {
                console.error('Ошибка:', error);
                alert('Не удалось добавить в корзину из-за сетевой ошибки.');
            }
        });
    });
});


