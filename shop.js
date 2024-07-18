document.addEventListener("DOMContentLoaded", function () {
    const cartItemsContainer = document.getElementById("cart-items");
    const totalPriceElement = document.getElementById("total-price");
    const checkoutButton = document.getElementById("checkout-btn");
    const checkoutForm = document.querySelector(".container form");
    let cart = [];

    // Function to add item to cart
    function addToCart(name, price) {
        const item = cart.find(i => i.name === name);
        if (item) {
            item.quantity++;
        } else {
            cart.push({ name, price, quantity: 1 });
        }
        updateCart();
    }

    // Function to remove item from cart
    function removeFromCart(name) {
        cart = cart.filter(item => item.name !== name);
        updateCart();
    }

    // Function to update cart
    function updateCart() {
        cartItemsContainer.innerHTML = '';
        let totalPrice = 0;
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <span>${item.name} (${item.quantity}) - $${item.price.toFixed(2)}</span>
                <button class="remove-btn" data-name="${item.name}">Remove</button>
            `;
            cartItemsContainer.appendChild(cartItem);
            totalPrice += item.price * item.quantity;
        });
        totalPriceElement.innerText = totalPrice.toFixed(2);

        // Add event listeners to remove buttons
        const removeButtons = document.querySelectorAll('.remove-btn');
        removeButtons.forEach(button => {
            button.addEventListener('click', function () {
                const name = this.getAttribute('data-name');
                removeFromCart(name);
            });
        });
    }

    // Add to cart buttons
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function (event) {
            event.preventDefault();
            const name = this.getAttribute('data-name');
            const price = parseFloat(this.getAttribute('data-price'));
            addToCart(name, price);
        });
    });

    // Checkout button
    checkoutButton.addEventListener('click', function (event) {
        event.preventDefault();
        checkoutForm.style.display = 'block';
    });

    // Checkout form submission
    checkoutForm.addEventListener('submit', function (event) {
        event.preventDefault();
        validateForm();
    });

    function validateForm() {
        const fullName = document.querySelector("input[placeholder='full Name']");
        const email = document.querySelector("input[placeholder='example@gmail.com']");
        const address = document.querySelector("input[placeholder='No - street - locality']");
        const city = document.querySelector("input[placeholder='Name of the City']");
        const district = document.querySelector("input[placeholder='Colombo']");
        const postalCode = document.querySelector("input[placeholder='123 456']");
        const nameOnCard = document.querySelector("input[placeholder='Enter your name']");
        const cardNumber = document.querySelector("input[placeholder='1111-2222-3333-4444']");
        const expMonth = document.querySelector("input[placeholder='january']");
        const expYear = document.querySelector("input[placeholder='year']");
        const cvv = document.querySelector("input[placeholder='123']");

        let errorMessage = "";

        if (!fullName.value) errorMessage += "Full name is required.\n";
        if (!email.value) errorMessage += "Email is required.\n";
        if (!address.value) errorMessage += "Address is required.\n";
        if (!city.value) errorMessage += "City is required.\n";
        if (!district.value) errorMessage += "District is required.\n";
        if (!postalCode.value) errorMessage += "Postal code is required.\n";
        if (!nameOnCard.value) errorMessage += "Name on card is required.\n";
        if (!cardNumber.value) errorMessage += "Card number is required.\n";
        if (!expMonth.value) errorMessage += "Expiration month is required.\n";
        if (!expYear.value) errorMessage += "Expiration year is required.\n";
        if (!cvv.value) errorMessage += "CVV is required.\n";

        if (errorMessage) {
            alert(errorMessage);
        } else {
            alert("Payment processed successfully!");
            cart = [];
            updateCart();
            checkoutForm.style.display = 'none';
        }
    }
});
