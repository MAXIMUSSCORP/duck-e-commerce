/**
 * This function creates a new section for each product in the store.
 * It creates an HTML structure for the product and returns it.
 *
 * @param {Object} ob - The product object containing the details of the product.
 * @returns {HTMLElement} The created HTML structure for the product.
 */
function dynamicDucks(ob) {
    let boxDiv = document.createElement("div");
    boxDiv.id = "box";

    boxDiv.innerHTML = `
        <a href="../ProductPage/productDetails.html?${ob.id}">
            <img src="${ob.preview}" alt="${ob.productName}">
            <div id="details">
                <h3>${ob.productName}</h3>
                <h2>USD ${ob.price}</h2>
            </div>
        </a>
    `;

    return boxDiv;
}

// Get the container for the products.
let containerDucks = document.getElementById("containerDucks");

// Function to handle the fetch response, check for success, and then parse the JSON.
function handleFetchResponse(response) {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

// Function to process the content titles and update the DOM accordingly.
function processContentTitles(contentTitles) {
    console.log('call successful');
    // Update the badge from the cookie, if present.
    if (document.cookie.indexOf(",counter=") >= 0) {
        document.getElementById("badge").innerHTML = document.cookie.split(",")[1].split("=")[1];
    }
    // Loop through each content title and add to the DOM if it matches the category.
    contentTitles.forEach(contentTitle => {
        console.log(contentTitle);
        containerDucks.appendChild(dynamicDucks(contentTitle));
    });
}

// Perform the fetch request to the products API.
fetch('https://65d7915c27d9a3bc1d7b5403.mockapi.io/products')
    .then(handleFetchResponse)
    .then(processContentTitles)
    .catch(error => console.error('Fetch error:', error));
