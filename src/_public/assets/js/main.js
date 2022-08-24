/* eslint-disable linebreak-style */


$(document).ready(function(){
    $(".c-header__openmenu").click(function(){
        $(this).parent().find(".c-gnav").addClass("is-show");
        $("body").css("overflow", "hidden");
    });
    
    $(".c-closemenu").click(function(){
        $(this).parent().parent().find(".c-gnav").removeClass("is-show");
        $("body").css("overflow", "auto");
    });
    
    $(".c-gnav").find("li").click(function(){
        $(".c-gnav").toggleClass("is-show");
    });

    //Slide mainvisual
    $(".c-mainvisual__slide").slick({
        slideToSlide: 1,
        autoplay: true,
        infinite: true,
        speed: 3000,
        fade: true,
        cssEase: "linear",
        dots: false,
        arrows: false,
    });

    //Slide pickup
    $(".c-pickup__slide").slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        infinite: true,
        arrows: true,
        draggable: false,
        dots: true,
        centerMode: true,
        variableWidth: true,
        prevArrow: "<div class='slick-prev slick-arrow'><img src='./_public/assets/img/arrow-prev.svg' alt='icon'></div>",
        nextArrow: "<div class='slick-next slick-arrow'><img src='./_public/assets/img/arrow-next.svg' alt='icon'></div>",
        responsive: [
            {
                breakpoint: 1600,
                settings: {
                    slidesToShow: 4,
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                    arrows: false,
                },
            },
            {
                breakpoint: 375,
                settings: {
                    slidesToShow: 1,
                    arrows: false,
                },
            },
        ],
    });

    //Phone call when sp
    if($(this).width() < 767) {
        $(".c-phone").css("cursor", "pointer");
        $(".c-phone").click(function(){
            window.open("tel: +0899471411");
        });
    } else {
        $(".c-phone").css("cursor", "default");
    }
});