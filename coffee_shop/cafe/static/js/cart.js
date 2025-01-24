document.addEventListener('DOMContentLoaded', () => {
    const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]')?.value;

    // Toast yaratish uchun funksiyalar
    const createToast = (message, type = 'success') => {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('show');
        }, 100);

        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 500);
        }, 3000);
    };

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
                    createToast(`Добавлено: ${data.product_name}, Количество: ${data.quantity}`);
                } else {
                    createToast(`Ошибка: ${data.message}`, 'error');
                }
            } catch (error) {
                console.error('Ошибка:', error);
                createToast('Не удалось добавить в корзину из-за сетевой ошибки.', 'error');
            }
        });
    });

    const recalculateButton = document.querySelector(".recalculate");
    const checkoutButton = document.querySelector(".checkout");
    const quantityInputs = document.querySelectorAll(".quantity-input");
    const removeLinks = document.querySelectorAll(".remove");

    /**
     * Обновляет общую стоимость корзины.
     */
    const updateCart = () => {
        let total = 0;

        quantityInputs.forEach(input => {
            const row = input.closest("tr");
            if (!row) return;

            const priceElement = row.querySelector("td:nth-child(3)");
            const itemTotalElement = row.querySelector(".item-total");

            const price = parseFloat(priceElement?.textContent.replace(/[^0-9,.]/g, "").replace(",", ".")) || 0;
            const quantity = Math.max(parseInt(input.value) || 0, 1);
            const newTotal = (price * quantity).toFixed(2);

            input.value = quantity; // Обеспечение минимального количества 1

            if (itemTotalElement) {
                itemTotalElement.textContent = `${newTotal} руб.`;
            }

            total += parseFloat(newTotal);
        });

        const cartTotalElement = document.getElementById("cart-total");
        if (cartTotalElement) {
            cartTotalElement.textContent = `${total.toFixed(2)} руб.`;
        }
    };

    /**
     * Удаляет товар из корзины.
     * @param {HTMLElement} link - Ссылка "Удалить".
     */
    const removeItem = (link) => {
        const row = link.closest("tr");
        if (row) {
            row.remove();
            updateCart();
            createToast('Товар удален из корзины.', 'success');
        }
    };

    /**
     * Показывает окно оформления заказа.
     */
    const showCheckoutModal = () => {
        const modal = document.createElement("div");
        modal.className = "checkout-modal";
        modal.innerHTML = `
            <div class="modal-content">
                <h2>Оформление заказа</h2>
                <form id="checkout-form">
                    <label for="phone">Телефон:</label>
                    <input type="tel" id="phone" name="phone" required placeholder="+7 XXX XXX XX XX">

                    <label for="address">Адрес доставки:</label>
                    <input type="text" id="address" name="address" required placeholder="Введите адрес">

                    <label for="payment">Метод оплаты:</label>
                    <select id="payment" name="payment" required>
                        <option value="card">Карта</option>
                        <option value="cash">Наличные</option>
                    </select>

                    <div class="modal-actions">
                        <button type="submit" class="btn confirm">Подтвердить</button>
                        <button type="button" class="btn cancel">Отмена</button>
                    </div>
                </form>
            </div>
        `;
        document.body.appendChild(modal);

        modal.querySelector(".cancel").addEventListener("click", () => {
            modal.remove();
        });

        modal.querySelector("#checkout-form").addEventListener("submit", (e) => {
            e.preventDefault();
            createToast("Ваш заказ успешно оформлен!", 'success');
            modal.remove();
        });
    };

    /**
     * Инициализирует обработчики для ссылок "Удалить".
     */
    const initializeRemoveLinks = () => {
        removeLinks.forEach(link => {
            link.addEventListener("click", (e) => {
                e.preventDefault();
                removeItem(link);
            });
        });
    };

    recalculateButton?.addEventListener("click", updateCart);
    checkoutButton?.addEventListener("click", showCheckoutModal);
    initializeRemoveLinks();

    quantityInputs.forEach(input => {
        input.addEventListener("change", updateCart);
    });
});

// CSS for Toast and Modal
const style = document.createElement('style');
style.textContent = `
.toast {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: #242424;
    color: #f5f5f5;
    padding: 10px 20px;
    border-radius: 5px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.5s, visibility 0.5s, transform 0.5s;
}

.toast.show {
    opacity: 1;
    visibility: visible;
    transform: translateX(-50%) translateY(-10px);
}

.toast-success {
    background-color: #4caf50;
}

.toast-error {
    background-color: #e53935;
}

.checkout-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
}

.modal-content {
    background: #242424;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
    text-align: center;
    color: #f5f5f5;
    width: 90%;
    max-width: 400px;
}

.modal-actions {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
}

.modal-actions .btn {
    flex: 1;
    margin: 0 5px;
}
`;
document.head.appendChild(style);



document.getElementById("confirm-button").addEventListener("click", function (e) {
    const addressField = document.getElementById("delivery-address");
    const address = addressField.value.trim();

    if (!address.includes("Москва")) {
        alert("Доставка возможна только в пределах Москвы. Пожалуйста, введите корректный адрес.");
        e.preventDefault(); // Останавливает отправку формы
    }
});
