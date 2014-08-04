
          
        //var imageGroup = $(".imageGroup");
        //var imageGroup = document.getElementsByClassName("imageGroup");
        //var circleRight = $("#circleRight").find("div:nth-of-type(2)");
        var circleRight = document.getElementById('arrowRight');
        //var rightArrow = circleRight.querySelectorAll("div:nth-of-type(2)");
        //var circleLeft = $("#circleLeft");
        var circleLeft = document.getElementById("circleLeft");
        var i = 0;
        //var imageGroupArray = $(".imageGroup");
        var imageGroupArray = document.getElementsByClassName("imageGroup")
        //var getTransitionDelay = document.getElementById("circleLeft").currentStyle.display;
        var getTransitionDelay = getStyle(imageGroupArray[0], "transition-duration");
        getTransitionDelay.replace(/\D/g,'');
        var transitionDelay = parseFloat(getTransitionDelay) * 1000;
        console.log(transitionDelay);
        //var imageGroupImage2 = $(".imageGroup").find("img:nth-of-type(2)");
        var imageGroupImage2 = document.querySelectorAll(".imageGroup img:nth-of-type(2)");
        //var imageGroupImage3 = $(".imageGroup").find("img:nth-of-type(3)");
        var imageGroupImage3 = document.querySelectorAll(".imageGroup img:nth-of-type(3)");
        function changeImagesUp(x, y){
            if(imageGroupArray[x].offsetWidth > 2){
                //$(imageGroupArray[x]).css({width: "0", transform: 'translateX(-50%) scale(0.3)', opacity: "0.1"});
                imageGroupArray[x].classList.remove("newImageGroupClass2");
                imageGroupArray[x].classList.add("newImageGroupClass");
                imageGroupArray[y].classList.add("newImageGroupClass2");
                //imageGroupArray[y].classList.add("newImageGroupClass");
                //$(imageGroupArray[x]).addClass("newImageGroupClass");
                
                imageGroupImage2[x].style.webkitTransform = 'translateX(100px)';
                imageGroupImage2[x].style.transform = 'translateX(100px)';
                imageGroupImage3[x].style.webkitTransform = 'translateX(150px)';
                imageGroupImage3[x].style.transform = 'translateX(150px)';
                //$(imageGroupArray[y]).css({width: "51%", transform: 'translateX(0) scale(1)', opacity: "1"});
                
                imageGroupImage2[y].style.webkitTransform = 'translateX(0)';
                imageGroupImage2[y].style.transform = 'translateX(0)';
                imageGroupImage3[y].style.webkitTransform = 'translateX(-50px)';
                imageGroupImage3[y].style.transform = 'translateX(-50px)';
            }
            
        }
        
        /*var slides = setInterval(function imageMove3(){
            circleLeft.addClass("newClassLeft");
            for(i=0, len = imageGroupArray.length; i < len;i++){
        changeImagesUp(i,i+1)
        if ($(imageGroupArray[imageGroupArray.length-2]).css("width")> "2px"){
                clearTimeout(slides);
                circleRight.addClass("newClassRight");
            }
           
    }
        },3000);*/
        /*function clearTimeouts(){
            clearTimeout(slides);
        }
         imageGroup.hover(function(){clearTimeouts()});*/
//$(circleRight).on('click', clickEvent);
circleRight.addEventListener('click', clickEvent);
function imageMove(){
    
    //$(circleLeft).addClass("newClassLeft");
    circleLeft.classList.add("newClassLeft");
    for(i=0, len = imageGroupArray.length; i < len;i++){
        changeImagesUp(i,i+1);
    }
    if (imageGroupArray[imageGroupArray.length - 2].offsetWidth > 2){
                //$(circleRight).addClass("newClassRight");
                circleRight.classList.add("newClassRight");
            }
        setTimeout(function() {
        
        console.log("hi Right")

        //$(circleRight).on("click", clickEvent)
        circleRight.addEventListener('click', clickEvent);
        }, transitionDelay);
        
    }
function clickEvent(){
    //$(circleRight).off("click");
    circleRight.removeEventListener("click", clickEvent);
    imageMove();
}

//$(circleLeft).on('click', clickEvent2);
circleLeft.addEventListener("click", clickEvent2)
    
function imageMove2(){
        //$(circleRight).removeClass("newClassRight");
        circleRight.classList.remove("newClassRight");
        for(i=0, len = imageGroupArray.length; i < len;i++){
        changeImagesUp(i,i-1);
        }
        if (imageGroupArray[1].offsetWidth > 2){
                circleLeft.classList.remove("newClassLeft");
            }
        
        setTimeout(function() {
    
        console.log("hi left")

        circleLeft.addEventListener("click", clickEvent2)
        }, transitionDelay);
}
function clickEvent2(){
    
    circleLeft.removeEventListener("click", clickEvent2);
    imageMove2();
}
function getStyle(oElm, strCssRule){
	var strValue = "";
	if(document.defaultView && document.defaultView.getComputedStyle){
		strValue = document.defaultView.getComputedStyle(oElm, "").getPropertyValue(strCssRule);
	}
	else if(oElm.currentStyle){
		strCssRule = strCssRule.replace(/\-(\w)/g, function (strMatch, p1){
			return p1.toUpperCase();
		});
		strValue = oElm.currentStyle[strCssRule];
	}
	return strValue;
}

$(function(){
var navigationContainer = $('#cd-nav'),
		mainNavigation = navigationContainer.find('#cd-main-nav ul');
$('.cd-nav-trigger').on('click', function(){
		$(this).toggleClass('menu-is-open');
		//we need to remove the transitionEnd event handler (we add it when scolling up with the menu open)
		mainNavigation.off('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend').toggleClass('is-visible');

	});
 
	var countClass = $(".count");
	var countLast = $('#countLast');
	var title = $(".statsLink2");
	var overallTotal = 0;
	
	$.each(countClass, function(i, item) {
		
		
		var dataString = $(item).attr('data-value').toString();
		var theCompleteString = dataString;
		var urlsAll = [theCompleteString];
		var totalAll = 0;
		$.ajaxSetup({
    timeout: 8000 //Time in milliseconds
});
		$.get(urlsAll).done(function(data) {
			totalAll += $(data).find(".yearGroup").find("li").length - $(data).find(".yearGroup").find(".red").length;
			
			//var random = Math.round(Math.random()* totalAll);
			//console.log(type);
			//Don't include the cards that I don't own
			//var randomness = hidden.find('li').not('li:has(.red)').eq(random).text();
			//console.log(randomness);
			var totalForTitle = $(title[i]).attr('data-value');
			var totalForEndTitle = $(title).last().attr('data-value');
			var formatIndividualTitle = 100*(totalAll) / totalForTitle;
			$(title[i]).attr("data-title", "Completion Stats: " + totalAll + "/" + ReplaceNumberWithCommas(totalForTitle)
					 + " or " + parseFloat(formatIndividualTitle.toFixed(1)) + "%" /*+ "<br /><hr />" + "Cards include: " + randomness*/);
			overallTotal += totalAll;
			var formatIndividualEndTitle = 100*(overallTotal) / totalForEndTitle;
			$(title).last().attr("data-title", "Overall Stats: " + ReplaceNumberWithCommas(overallTotal) + "/" + ReplaceNumberWithCommas(totalForEndTitle) + " or " + parseFloat(formatIndividualEndTitle.toFixed(1)) + "%")
                        $(item).fadeOut(300,function(){
                        $(item).text(totalAll).fadeIn(400);
                        countLast.text(ReplaceNumberWithCommas(overallTotal)).show();
                        });
			
			console.log("loaded " + totalAll);
						
		})
                .fail(function(data){
                  $(item).html("failed to load").show();
                });
		
	});
        function ReplaceNumberWithCommas(yourNumber) {
    //Seperates the components of the number
    var n= yourNumber.toString().split(".");
    //Comma-fies the first part
    n[0] = n[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    //Combines the two sections
    return n.join(".");
}

});

 /*var mainNavigation = document.querySelectorAll("#cd-main-nav ul");
var trigger = document.getElementById('menuButton');
trigger.addEventListener('click', toggleMenu)
		//$(this).toggleClass('menu-is-open');
function toggleMenu(){
    trigger.classList.toggle("menu-is-open");
    trigger.getElementById("cd-main-nav").getElementsByTagName("ul").classList.toggle("is-visible");
}*/
/*$("#pause").click(function() {
  timer = setInterval(function () {
      for(i=0, len = imageGroupArray.length; i < len;i++){
        changeImagesUp(i,i+1);
    }
  }, interval); 
});

$("#expand").click(function() {
  clearInterval(timer);
  timer = null
});*/