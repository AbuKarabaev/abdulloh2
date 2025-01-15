document.addEventListener("DOMContentLoaded", function () {
    const recalculateButton = document.querySelector(".recalculate");
    const checkoutButton = document.querySelector(".checkout");
    const quantityInputs = document.querySelectorAll(".quantity-input");
    const removeLinks = document.querySelectorAll(".remove");

    function updateCart() {
        let total = 0;

        quantityInputs.forEach(input => {
            const row = input.closest("tr");
            const price = parseFloat(row.querySelector("td:nth-child(3)").textContent.replace(" руб.", "").replace(",", "."));
            const quantity = parseInt(input.value);
            const itemTotal = row.querySelector(".item-total");
            const newTotal = (price * quantity).toFixed(2);

            itemTotal.textContent = `${newTotal} руб.`;
            total += parseFloat(newTotal);
        });

        document.getElementById("cart-total").textContent = `${total.toFixed(2)} руб.`;
    }

    recalculateButton.addEventListener("click", function () {
        updateCart();
    });

    removeLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const row = link.closest("tr");
            row.remove();
            updateCart();
        });
    });

    checkoutButton.addEventListener("click", function () {
        alert("Заказ успешно оформлен!");
    });
});
