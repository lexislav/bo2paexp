/**
 * Created by hotovec on 25.9.2014.
 */

$(document).foundation();

var isTouch = true;

$(function () {

    if( $("html").hasClass("no-touch")) {
        isTouch = false;
    };

    // menu color swithching

    var menuBreakPoint = 600;
    if( $("html").hasClass("no-touch")) {
        $(window).scroll(function () {
            //console.log('st:' + $(window).scrollTop());
            if ($(window).scrollTop() > menuBreakPoint) {
                $(".m-nav.switchable").addClass("mm-white");
            } else {
                $(".m-nav.switchable").removeClass("mm-white");
            }
        });
    };

    // open menu
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

    $(window).resize(function () {
        if( $("html").hasClass("no-touch")) {
            isTouch = false;
        };
    });


});
