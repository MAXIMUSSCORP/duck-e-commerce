let cart = JSON.parse(localStorage.getItem('cart')) || { items: {} };
let counter = parseInt(localStorage.getItem('counter'), 10) || 0;
document.addEventListener('DOMContentLoaded', () => {
    console.log(cart);

    fetch('https://65d7915c27d9a3bc1d7b5403.mockapi.io/products/')
        .then(response => response.json())
        .then(products => {
            Object.entries(cart.items).forEach(([itemId, itemCount]) => {
                if (itemCount > 0) {
                    const product = products.find(p => p.id === itemId);
                    if (product) {
                        dynamicCartSection(product, itemCount);
                        console.log(product);
                    }
                }
            });
        });
});

function dynamicCartSection(product, itemCount) {
    const cartContainer = document.getElementById('cartContainer');
    const productElement = document.createElement('div');

    productElement.className = 'cart-item';
    productElement.innerHTML = `
        <div class="product-image">
            <img src="${product.preview}" alt="${product.productName}">
        </div>
        <div class="product-details">
            <h3>${product.productName}</h3>
            <div class="quantity-controls">
                <button class="subtract">-</button>
                <span class="quantity">${itemCount}</span>
                <button class="add">+</button>
            </div>
            <p class="price">Price: $${(product.price * itemCount).toFixed(2)}</p>
        </div>
    `;
    cartContainer.appendChild(productElement);

    // Add event listeners for add and subtract buttons
    productElement.querySelector('.add').addEventListener('click', () => {
        cart.items[product.id] += 1;
        localStorage.setItem('cart', JSON.stringify(cart));
        updateTotalCost();
        productElement.querySelector('.quantity').innerText
            = cart.items[product.id];
        productElement.querySelector('.price').innerText
            = `Price: $${(product.price * cart.items[product.id]).toFixed(2)}`;

        counter += 1;
        localStorage.setItem('counter', counter);
        checkoutCounter();
    });
    productElement.querySelector('.subtract').addEventListener('click', () => {
        if (cart.items[product.id] > 1) {
            cart.items[product.id] -= 1;
            localStorage.setItem('cart', JSON.stringify(cart));
            updateTotalCost();
            productElement.querySelector('.quantity').innerText
                = cart.items[product.id];
            productElement.querySelector('.price').innerText
                = `Price: $${(product.price * cart.items[product.id]).toFixed(2)}`;

            counter -= 1;
            localStorage.setItem('counter', counter);
            checkoutCounter();
        } else {
            cart.items[product.id] -= 1;
            localStorage.setItem('cart', JSON.stringify(cart));
            updateTotalCost();

            counter -= 1;
            localStorage.setItem('counter', counter);
            location.reload();
        }
    });
}

// Function to update the total cost
function updateTotalCost() {
    const cart = JSON.parse(localStorage.getItem('cart')) || { items: {} };
    fetch('https://65d7915c27d9a3bc1d7b5403.mockapi.io/products/')
        .then(response => response.json())
        .then(products => {
            let totalCost = 0;
            Object.entries(cart.items).forEach(([itemId, itemCount]) => {
                const product = products.find(p => p.id === itemId);
                if (product && itemCount > 0) {
                    totalCost += product.price * itemCount;
                }
            });
            document.getElementById('totalCost').innerText = `Total Cost: $${totalCost.toFixed(2)}`;
        });
}

// Call updateTotalCost to initially set the total cost
document.addEventListener('DOMContentLoaded', () => {
    // Existing code for fetching and displaying cart items...

    // Update total cost on page load
    updateTotalCost();
});
