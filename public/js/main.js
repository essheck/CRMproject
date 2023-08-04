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
});

$("#update-lead").click(function(){
    $("#updateform").toggleClass("hidden");
})

$("#edit-profile").click(function() {
    $(".input").removeAttr('readonly').addClass("is-info");
    $("#button-field").removeClass("hidden");
})
