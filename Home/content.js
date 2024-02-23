/**
 * This function creates a new section for each product in the store.
 * It creates an HTML structure for the product and returns it.
 *
 * @param {Object} ob - The product object containing the details of the product.
 * @returns {HTMLElement} The created HTML structure for the product.
 */
function dynamicDucksSection(ob) {

    let boxLink = document.createElement("a");
    boxLink.href = "/duck-e-commerce/ProductPage/productDetails.html?" + ob.id;

    let boxDiv = document.createElement("div");
    boxDiv.id = "box";

    let imgTag = document.createElement("img");
    imgTag.src = ob.preview;

    let detailsDiv = document.createElement("div");
    detailsDiv.id = "details";

    let h3 = document.createElement("h3");
    let h3Text = document.createTextNode(ob.productName);
    h3.appendChild(h3Text);

    let h2 = document.createElement("h2");
    let h2Text = document.createTextNode("USD  " + ob.price);
    h2.appendChild(h2Text);

    boxDiv.appendChild(boxLink);
    boxLink.appendChild(imgTag);
    boxLink.appendChild(detailsDiv);
    detailsDiv.appendChild(h3);
    detailsDiv.appendChild(h2);

    return boxDiv;
}

// Get the container for the products.
let containerDucks = document.getElementById("containerDucks");

// Create a new XMLHttpRequest object.
let httpRequest = new XMLHttpRequest();

/**
 * This function is called whenever the readyState attribute changes.
 * It checks if the request is complete and was successful.
 * If so, it parses the response and creates a new section for each product.
 */
httpRequest.onreadystatechange = function() {
    let contentTitle;
    if (this.readyState === 4) {
        if (this.status === 200) {
            console.log('call successful');
            contentTitle = JSON.parse(this.responseText);
            if (document.cookie.indexOf(",counter=") >= 0) {
                document.getElementById("badge").innerHTML = document.cookie.split(",")[1].split("=")[1];
            }
            for (let i = 0; i < contentTitle.length; i++) {
                    console.log(contentTitle[i]);
                    containerDucks.appendChild(
                        dynamicDucksSection(contentTitle[i])
                    );
            }
        } else {
            console.log("call failed!");
        }
    }
};

// Open a new request to the products API.
httpRequest.open(
    "GET",
    "https://65d7915c27d9a3bc1d7b5403.mockapi.io/products",
    true
);

// Send the request.
httpRequest.send();