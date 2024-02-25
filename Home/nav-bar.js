/**
 * This function makes an HTML element appear by changing its opacity to 1.
 * @param {string} elementId - The id of the HTML element.
 */
function TAppear(elementId) {
    document.getElementById(elementId).style.opacity = '1';
}

/**
 * This function makes an HTML element disappear by changing its opacity to 0.
 * @param {string} elementId - The id of the HTML element.
 */
function TDisappear(elementId) {
    document.getElementById(elementId).style.opacity = '0';
}


function checkoutCounter() {
    console.log("checkoutCounter");
    let count
    if (localStorage.getItem('counter') !== null) {
        count = parseInt(localStorage.getItem('counter'), 10);
    } else {
        count = 0;
    }
    console.log("count: " + count);
    let checkout = document.getElementById("count");
    checkout.innerHTML = count;
}