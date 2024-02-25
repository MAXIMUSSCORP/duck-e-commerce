
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