$(document).ready(function() {
    var n = $(".links"),
        o = $(".spanWrapper"),
        e = $(".closeBar"),
        b = $("button"),
        i = $(".close"),
        f = $(".circle"),
        s = $(".shadowing"),
        d = document.querySelectorAll(".box li"),
        t = document.querySelectorAll(".box li a"),
        c = $("body");
        $(f, s).bind("animationend webkitAnimationEnd MSAnimationEnd oAnimationEnd", function() {

        $(f, s).fadeOut("slow", function() {
            //this is to control the two layouts.
            if ($(".list1").is(":visible")) {
                i.hide();
            }
            $(".box, .shadowingAfter").fadeIn("slow")
        }), $(".hover").bind("touchstart touchend", function(n) {
            n.preventDefault(), $(this).toggleClass("hover_effect");
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
            //add additional padding between the modal and li
            var pad = 15;
            var totalMargin = difference3 + pad;
            $(o[e]).stop().css({transition: "all 0.8s ease-in-out"}).addClass("spanWrapperOnHover");
            //if the difference is a negative number there is no need to move the li
            if (difference3 <= 0) {
                $(d[e]).css({transform: "translateX(" + (0) + "px)"})
            }
            else {
                $(d[e]).css({transform: "translateX(" + (totalMargin) + "px)"})
            }
            c.addClass("bodyOnHover")
        }, function() {
            $(o[e]).stop().removeClass("spanWrapperOnHover"),
            $(d[e]).css({transform: "translateX(0)"}),
            c.removeClass("bodyOnHover")
        })
    }), $.each(b, function(n) {
        $(this).click(function() {
            $(i[n]).slideToggle("500", "linear", "true");
        })
    }), $(window).resize(function() {
        //this is to control the two layouts.
        if ($(".list1").is(":visible")) {
                i.hide()
            }
    })
    $.getJSON("http://www.reddit.com/user/MOFNY/comments.json?&sort=new", function(data) {
        $('span.reddit').html("Reddit is my favorite site for trending web development discussion.  I comment in all the popular subreddit's including web_design, webdev, and design_critiques. I've critiqued well over 100 sites for amatuer and professional developers and designers.  I also share my Codepen and volunteer work on Reddit.  Check out my latest Reddit comment: <br /><br /><i class='fa fa-quote-left'></i><em>" + data.data.children[0].data.body + "</em>")
        $('div.reddit').html("Reddit is my favorite site for trending web development discussion. I comment in all the popular subreddits including web_design, webdev, and design_critiques. I have also dabbled with the expansive API. Check out my latest Reddit comment: " + 
            '"<em>' + data.data.children[0].data.body + '</em>"' + '<br />' + '<a href="http://www.reddit.com/user/MOFNY/" target="_blank">Proceed to Site</a>')
    });
});