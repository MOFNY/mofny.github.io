$(document).ready(function() {
    var n = $(".links"),
        o = $("span"),
        e = $(".closeBar"),
        b = $("button"),
        i = $(".close"),
        a = $("h1"),
        f = $(".circle"),
        s = $(".shadowing"),
        c = $("body");
    $.each(n, function(e) {
        $(n[e]).hover(function() {
            $(o[e]).stop().fadeToggle("500", "linear", "true"),
            c.addClass("bodyOnHover"), a.addClass("onHover")
        }, function() {
            $(o[e]).stop().fadeToggle("500", "linear", "true"),
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
    }), $(f, s).bind("animationend webkitAnimationEnd MSAnimationEnd oAnimationEnd", function() {
        $(f, s).fadeOut("slow", function() {
            if ($(".list1").is(":visible")) {
                i.hide()
            }
            $(".box, .shadowingAfter").fadeIn("slow")
        }), $(".hover").bind("touchstart touchend", function(n) {
            n.preventDefault(), $(this).toggleClass("hover_effect")
        })
    })
    $.getJSON("http://www.reddit.com/user/MOFNY/comments.json?&sort=new", function(data) {
        $('span.reddit').html("Reddit is my favorite site for trending web development discussion. I comment in all the popular subreddits including web_design, webdev, and design_critiques. I have also dabbled with the expansive API. Check out my latest Reddit comment: " + '"<em>' + data.data.children[0].data.body + '</em>"')
        $('div.reddit').html("Reddit is my favorite site for trending web development discussion. I comment in all the popular subreddits including web_design, webdev, and design_critiques. I have also dabbled with the expansive API. Check out my latest Reddit comment: " + 
            '"<em>' + data.data.children[0].data.body + '</em>"' + '<br />' + '<a href="http://www.reddit.com/user/MOFNY/" target="_blank">Proceed to Site</a>')
    });
});