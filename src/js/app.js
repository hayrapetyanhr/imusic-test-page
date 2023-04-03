$(function () {
    let sliderThumbs = new Swiper('.slider-thumbs', {
        spaceBetween: 6,
        slidesPerView: 5,
        loop: false,
        freeMode: true,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
    });
    let sliderTop = new Swiper('.slider-top', {
        loop: false,
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        thumbs: {
            swiper: sliderThumbs,
        },
    });

    $('.navbar-toggle').click( function() {
        $(this).toggleClass('animate');
        $('.navbar-nav').slideToggle();
    })
});