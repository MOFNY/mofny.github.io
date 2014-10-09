$(document).ready(function() {
    var n = $(".links"),
        o = $(".spanWrapper"),
        e = $(".closeBar"),
        b = $("button"),
        i = $(".close"),
        a = $("h1"),
        f = $(".circle"),
        s = $(".shadowing"),
        d = document.querySelectorAll(".box li"),
        t = document.querySelectorAll(".box li a"),
        c = $("body");
        $(f, s).bind("animationend webkitAnimationEnd MSAnimationEnd oAnimationEnd", function() {

        $(f, s).fadeOut("slow", function() {
            if ($(".list1").is(":visible")) {
                i.hide()
            }
            $(".box, .shadowingAfter").fadeIn("slow")
        }), $(".hover").bind("touchstart touchend", function(n) {
            n.preventDefault(), $(this).toggleClass("hover_effect")
        })
    }),
    $.each(n, function(e) {
        $(n[e]).hover(function() {
            var currentAnchorWidth = $(t[e]).innerWidth();
            var popUpWidth = o.innerWidth();
            var screenWidth = $(".box").innerWidth();
            var difference = (screenWidth - $(t[e]).innerWidth()) / 2;
            var difference2 = screenWidth - popUpWidth;
            var difference3 = screenWidth - (difference + difference2);
            var pad = 5;
            var totalMargin = difference3 + pad;
            $(o[e]).stop().css({opacity: 1, zIndex: 3, transform: "scale(1)"});
            if (difference3 <= 0) {
                $(d[e]).css({transform: "translateX(" + (0) + "px)"})
            }
            else {
                $(d[e]).css({transform: "translateX(" + (totalMargin) + "px)"})
            }
            c.addClass("bodyOnHover"), a.addClass("onHover")
        }, function() {
            $(o[e]).stop().css({opacity: 0, zIndex: 1, transform: "scale(0.7)"}),
            $(d[e]).css({transform: "translateX(0)"}),
            c.removeClass("bodyOnHover"), a.removeClass("onHover")
        })
    }), $.each(b, function(n) {
        $(this).click(function() {
            $(i[n]).slideToggle("500", "linear", "true");
        })
    }), $(window).resize(function() {
        if ($(".list1").is(":visible")) {
                i.hide()
            }
    })
    $.getJSON("http://www.reddit.com/user/MOFNY/comments.json?&sort=new", function(data) {
        $('span.reddit').html("Reddit is my favorite site for trending web development discussion. I comment in all the popular subreddits including web_design, webdev, and design_critiques. I have also dabbled with the expansive API. Check out my latest Reddit comment: " + '"<em>' + data.data.children[0].data.body + '</em>"')
        $('div.reddit').html("Reddit is my favorite site for trending web development discussion. I comment in all the popular subreddits including web_design, webdev, and design_critiques. I have also dabbled with the expansive API. Check out my latest Reddit comment: " + 
            '"<em>' + data.data.children[0].data.body + '</em>"' + '<br />' + '<a href="http://www.reddit.com/user/MOFNY/" target="_blank">Proceed to Site</a>')
    });
    
    
});