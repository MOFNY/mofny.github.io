$(document).ready(function () {
	var circleRight = document.getElementById('arrowRight');
	var circleLeft = document.getElementById("circleLeft");
	var i = 0;
	var imageGroupArray = document.getElementsByClassName("imageGroup");
	var getTransitionDelay = getStyle(imageGroupArray[0], "transition-duration");
	getTransitionDelay.replace(/\D/g, '');
	var transitionDelay = parseFloat(getTransitionDelay) * 1000;
	var imageGroupImage2 = document.querySelectorAll(".imageGroup img:nth-of-type(2)");
	var imageGroupImage3 = document.querySelectorAll(".imageGroup img:nth-of-type(3)");
	var countClass = $(".count");
	var countLastAfter = $('#countLastAfter');
	var title = $(".totals-list__anchor");
	var overallTotal = 0;

	function changeImagesUp(x, y) {
		if (imageGroupArray[x].offsetWidth > 2) {
			imageGroupArray[x].classList.remove("newImageGroupClass2");
			imageGroupArray[x].classList.add("newImageGroupClass");
			imageGroupArray[y].classList.add("newImageGroupClass2");
			imageGroupImage2[x].style.webkitTransform = 'translateX(100px)';
			imageGroupImage2[x].style.transform = 'translateX(100px)';
			imageGroupImage3[x].style.webkitTransform = 'translateX(150px)';
			imageGroupImage3[x].style.transform = 'translateX(150px)';
			imageGroupImage2[y].style.webkitTransform = 'translateX(0)';
			imageGroupImage2[y].style.transform = 'translateX(0)';
			imageGroupImage3[y].style.webkitTransform = 'translateX(-50px)';
			imageGroupImage3[y].style.transform = 'translateX(-50px)';
		}
	}
	circleRight.addEventListener('click', clickEvent);

	function imageMove() {
		circleLeft.removeAttribute('disabled');
		for (i = 0, len = imageGroupArray.length; i < len; i++) {
			changeImagesUp(i, i + 1);
		}
		if (imageGroupArray[imageGroupArray.length - 2].offsetWidth > 2) {
			circleRight.setAttribute('disabled', '');
			circleLeft.focus();
		}
		setTimeout(function () {
			circleRight.addEventListener('click', clickEvent);
		}, transitionDelay);
	}

	function clickEvent() {
		circleRight.removeEventListener("click", clickEvent);
		imageMove();
		return false;
	}
	circleLeft.addEventListener("click", clickEvent2)

	function imageMove2() {
		circleRight.removeAttribute('disabled');
		for (i = 0, len = imageGroupArray.length; i < len; i++) {
			changeImagesUp(i, i - 1);
		}
		if (imageGroupArray[1].offsetWidth > 2) {
			circleLeft.setAttribute('disabled', '');
			circleRight.focus();
		}
		setTimeout(function () {
			circleLeft.addEventListener("click", clickEvent2)
		}, transitionDelay);
	}

	function clickEvent2() {
		circleLeft.removeEventListener("click", clickEvent2);
		imageMove2();
		return false;
	}
	//for getting the style from the existing external style sheet
	function getStyle(oElm, strCssRule) {
		var strValue = "";
		if (document.defaultView && document.defaultView.getComputedStyle) {
			strValue = document.defaultView.getComputedStyle(oElm, "").getPropertyValue(strCssRule);
		} else if (oElm.currentStyle) {
			strCssRule = strCssRule.replace(/\-(\w)/g, function (strMatch, p1) {
				return p1.toUpperCase();
			});
			strValue = oElm.currentStyle[strCssRule];
		}
		return strValue;
	}

	var primaryNav = $("#primary-nav")
	$("#menu-button").on("click", function () {
		$(this).toggleClass("menu-is-open");
		primaryNav.on("webkitTransitionEnd transitionend").toggleClass("primary-nav--is-visible")
	});
	$.each(countClass, function (i, item) {
		var dataString = $(item).attr('data-value').toString();
		var theCompleteString = dataString;
		var urlsAll = [theCompleteString];
		var totalAll = 0;
		$.ajaxSetup({
			timeout: 8000
		});
		$.get(urlsAll).done(function (data) {
			totalAll += $(data).find(".yearGroup").find("li").length - $(data).find(".yearGroup").find(".red").length;
			var totalForTitle = $(title[i]).attr('data-value');
			var totalForEndTitle = $(title).last().attr('data-value');
			var formatIndividualTitle = 100 * (totalAll) / totalForTitle;
			$(title[i]).attr("data-title", "Completion Stats: " + ReplaceNumberWithCommas(totalAll) + "/" + ReplaceNumberWithCommas(totalForTitle) + " or " + parseFloat(formatIndividualTitle.toFixed(1)) + "%");
			overallTotal += totalAll;
			var formatIndividualEndTitle = 100 * (overallTotal) / totalForEndTitle;
			$(title).last().attr("data-title", "Overall Stats: " + ReplaceNumberWithCommas(overallTotal) + "/" + ReplaceNumberWithCommas(totalForEndTitle) + " or " + parseFloat(formatIndividualEndTitle.toFixed(1)) + "%")
			var spinner = $('.spinner');
			$(item).text(ReplaceNumberWithCommas(totalAll)).addClass('expand');
			countLastAfter.text(ReplaceNumberWithCommas(overallTotal)).addClass('move-count-last-after');
		});
	});

	function ReplaceNumberWithCommas(yourNumber) {
		//Seperates the components of the number
		var n = yourNumber.toString().split(".");
		//Comma-fies the first part
		n[0] = n[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		//Combines the two sections
		return n.join(".");
	}
	$(".arrow-up2").click(function () {
		$('html, body').animate({
			scrollTop: 0
		}, 700, 'easeInOutCubic');
	});
});
