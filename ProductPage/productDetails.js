let id;

let cart;
document.addEventListener('DOMContentLoaded', () => {
    // Check if cart exists in local storage
    if (localStorage.getItem('cart') === null) {
        cart = {
            items: {
                "1": 0,
                "2": 0,
                "3": 0,
                "4": 0,
                "5": 0,
                "6": 0,
                "7": 0,
                "8": 0
            }
        };
        localStorage.setItem('cart', JSON.stringify(cart));
    } else {
        cart = JSON.parse(localStorage.getItem('cart'));
    }
});
function getQueryParam() {
    id = new URL(window.location.href).search.substring(1);
    return id;
}

function dynamicContentDetails(ob) {
    const containerProduct = document.getElementById('containerProduct');

    const mainContainerHTML = `
        <div id="containerD">
            <div id="imageSection">
                <img id="imgDetails" src="${ob.preview}">
            </div>
            <div id="productDetails">
                <h1>${ob.productName}</h1>
                <div id="details">
                    <h3>USD ${ob.price}</h3>
                    <h3>Description</h3>
                    <p>${ob.description}</p>
                </div>
                <div id="productPreview">
                    <h3>Product Preview</h3>
                    ${ob.productImages.map((src, index) => `<img id="previewImg${index}" src="${src}">`).join('')}
                </div>
                <div id="button">
                    <button id="addToCartButton">${ob.category !== "limited" ? 'Add to Cart' : 'Out of Stock'}</button>
                </div>
            </div>
        </div>
    `;

    containerProduct.insertAdjacentHTML('beforeend', mainContainerHTML);

    if (ob.category !== "limited") {
        document.getElementById('addToCartButton').addEventListener('click', function() {
            // Assuming 'id' is defined somewhere relevant to this context
            cart.items[id] += 1;
            console.log(cart);
            localStorage.setItem('cart', JSON.stringify(cart));

            let counter = parseInt(localStorage.getItem('counter'), 10);
            counter += 1;
            localStorage.setItem('counter', counter);

            checkoutCounter();
        });
    } else {
        const buttonTag = document.getElementById('addToCartButton');
        buttonTag.disabled = true;
        buttonTag.style.backgroundColor = "grey";
    }

    // Adding event listeners to dynamically created product preview images for changing the main image
    ob.productImages.forEach((imageSrc, index) => {
        document.getElementById(`previewImg${index}`).addEventListener('click', () => {
            document.getElementById("imgDetails").src = imageSrc;
        });
    });
}


let containerProduct = document.getElementById('containerProduct')

// BACKEND CALLING
document.addEventListener('DOMContentLoaded', function() {
    // Assuming 'id' is obtained similarly as in your XMLHttpRequest example
    const id = getQueryParam(); // Placeholder function to obtain 'id'

    fetch(`https://65d7915c27d9a3bc1d7b5403.mockapi.io/products/${id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(product => {
            console.log('call successful', product);
            containerProduct.appendChild(dynamicContentDetails(product));
        })
        .catch(error => {
            console.error('Fetch error:', error.message);
        });
});
