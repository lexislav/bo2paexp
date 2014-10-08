/**
 * Created by hotovec on 25.9.2014.
 */

$(function () {


    var menuBreakPoint = $(window).height() * .9;

    $(window).resize(function () {
        menuBreakPoint = $(window).height() * .9;
    });

    // menu swithching
    if( $("html").hasClass("no-touch")) {
        $(window).scroll(function () {
            console.log('st:' + $(window).scrollTop());
            if ($(window).scrollTop() > menuBreakPoint) {
                $(".m-nav").addClass("mm-white");
                $(".m-nav").removeClass("mm-black");
            } else {
                $(".m-nav").addClass("mm-black");
                $(".m-nav").removeClass("mm-white");
            }
        });
    };


    $(".m-nav--button").click(function() {
        var el = $(this);
        //el.parent().toggleClass("is-opened");
        $(".m-nav--overlay").fadeIn(80);
    });

    $(".m-nav--overlay").click(function() {
        var el = $(this);
        //el.parent().toggleClass("is-opened");
        $(".m-nav--overlay").fadeOut(60);
    });



});
