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

// When the document is ready, the following code will be executed.
$(document).ready(function()
{
    // Initialize slick slider on the element with class 'containerSlider'.
    $('.containerSlider').slick({
        arrows: false,
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
    });
});