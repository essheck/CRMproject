$(document).ready(function() {
    // $('body').niceScroll({ emulateTouch: true});
    function setHeight() {
        var navbarHeight = $(".navbar").outerHeight();
        $(".menu-wrapper").outerHeight(document.documentElement.clientHeight - navbarHeight)
        $(".menu-wrapper").niceScroll({
            emulateTouch: true
        })
        // $(".dashboard").outerHeight(document.documentElement.clientHeight - navbarHeight)
    }
    setHeight();
    $(window).on("resize" , function(){
        setHeight();
    });

    $('.menu-wrapper a').each(function () {
        if ($(this).prop('href') == window.location.href) {
            $(this).addClass('is-active');
         }
    })

    $(".toggler").on("click" , function() {
        $(".menu-container").toggleClass("active");
    })

    $(".navbar-toggler").on("click" , function(){
        $(".navbar-toggler").toggleClass("is-active")
        $(".navbar-menu").toggleClass("is-active")
    })
});

$("#update-lead").click(function(){
    $("#updateform").toggleClass("hidden");
})

$("#edit-profile").click(function() {
    $(".input").removeAttr('readonly').addClass("is-info");
    $("#button-field").removeClass("hidden");
})


