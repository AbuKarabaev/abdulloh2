document.addEventListener("DOMContentLoaded", () => {
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

            const price = parseFloat(priceElement?.textContent.replace(" руб.", "").replace(",", ".") || 0);
            const quantity = parseInt(input.value) || 0;
            const newTotal = (price * quantity).toFixed(2);

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
        }
    };

    /**
     * Обработчик клика для кнопки "Пересчитать".
     */
    recalculateButton?.addEventListener("click", updateCart);

    /**
     * Обработчик клика для ссылок "Удалить".
     */
    removeLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            removeItem(link);
        });
    });

    /**
     * Обработчик клика для кнопки "Оформить заказ".
     */
    checkoutButton?.addEventListener("click", () => {
        alert("Заказ успешно оформлен!");
    });
});
