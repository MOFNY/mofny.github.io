
$(document).ready(function () {
	//for the activateAll function
	var actionTaken = false;
	var htmlBody = $('html, body');
	var timeDuration = 0;
	var slideToggleDuration = 500;
	//the variables needed for the floating buttons
	var groupArray = $(".yearGroup");
	var buttonArray = $(".buttonGroup");
	var hideGroupArray = $(".hideGroup");
	var closeBarArray = $(".closeBar");
	var closeBar = $("#allCloseBar");
	var menuButton = $("#menu-button");
	var primaryNav = $("#primary-nav");
	var allButtonArray = [];
	var allButtonArrayFixString = [];
	var openAll = false;
	var hideInfo = $("#hideInfo");
	var overall = $(".overallInsertsTotal");
	var revealAllButton = $("#revealAllButton");
	var totalArray = $(".totalGroup");
	var overallTotal = $(".overallTotalGroup");
	var li = $("li");
	var totalNumArray = [];
	var totalMinusGoneOverall = [];
	var redAsterisks = $(".red");
	var overallGroup = $(groupArray).find(li).length - $(groupArray).find(redAsterisks).length;
	var arrowDown = $(".arrow-down");
	var arrowUp = $(".arrow-up");
	arrowDown.hide();
	arrowUp.hide();
	function trainClick() {
		hideInfo.slideToggle("slow");
	}
	overall.on("click", function () {
		trainClick();
	});


	function restoreDurations() {
		timeDuration = 800;
		slideToggleDuration = 500;
	}
	function scrollBarrier() {
		if ($(window).scrollTop() > $("#closeArea").offset().top) {
			closeBar.css({ position: "fixed" });
		} else {
			closeBar.css({ position: "relative", top: "0", zIndex: "1" });
		}
	}
	$.each(buttonArray, function (i, item) {
		$(this).click(function () {
			window.addEventListener("scroll", scrollBarrier);
			setTimeout(function () { $(buttonArray[i]).css({ opacity: "0", transform: "scale(0.2)", width: "0" }); $(buttonArray[0]).css({ opacity: "1", transform: "scale(1)", width: "50%" }) }, 200);
			sortElements = function (a, b) {
				if (a.text() < b.text()) {
					return -1;
				}
				else if (a.text() > b.text()) {
					return 1;
				}
				else {
					return 0;
				}
			};
			sortElements2 = function (a, b) {
				if (a < b) {
					return -1;
				}
				else if (a > b) {
					return 1;
				}
				else {
					return 0;
				}
			};

			if ($(this).text() == "All Years") {

				openAll = !openAll;
				for (var z = 1; z < buttonArray.length; z++) {
					if (openAll && $(groupArray[z - 1]).height() == 0) {
						$.when($(buttonArray[z]).triggerHandler("click")).done(function () {
							htmlBody.animate({ scrollTop: revealAllButton.offset().top + 100 }, { duration: 1000, easing: 'easeOutQuad' });
							disableAnimation();
						});
					}
					else if (!openAll && $(groupArray[z - 1]).height() > 0) {
						$.when($(buttonArray[z]).triggerHandler("click")).done(function () {
							htmlBody.animate({ scrollTop: revealAllButton.offset().top + 30 }, { duration: 0, easing: 'easeOutQuad' });
							disableAnimation();
						});
					}
				}
			}
			$(hideGroupArray[i - 1]).slideToggle(slideToggleDuration, function () {
				timeDuration = 800;
				htmlBody.animate({ scrollTop: $(groupArray[i - 1]).offset().top - 100 }, { duration: timeDuration, easing: 'easeOutQuad' });
				setTimeout(function () { $(buttonArray[i]).toggleClass("float") }, 800);
				if ($(groupArray[i - 1]).height() > 0) {
					//This will stop any animations if the user scrolls.
					closeBar.css({ zIndex: "1", height: "80px" });
					primaryNav.addClass('primary-nav--float-bar-is-open');
					disableAnimation();
					hideInfo.hide("slow");
					$(overall).off("click");
					$(overall).addClass("overallInsertsTotal2").attr('data-content', '');
					allButtonArray.splice(0, 0, $(buttonArray[i]));
					allButtonArrayFixString.splice(0, 0, $(buttonArray[i]).text());
					allButtonArray.sort(sortElements);
					allButtonArrayFixString.sort(sortElements2);
					var timer;
					var delay = 1500;
					$(buttonArray[i]).hover(function () {
						//This will stop any animations if the user scrolls.
						disableAnimation();
						var link = $(groupArray[i - 1]);
						var offset = link.offset();
						var top2 = offset.top;
						var left = offset.left;
						var bottom = top2 + $(groupArray[i - 1]).outerHeight();
						var right = $(window).width() - link.width();
						right = Math.abs(offset.left - right);
						var scrollDuration = 0;
						if (inRange($(buttonArray[i]).offset().top, $(groupArray[i - 1]).position().top, bottom)) {
							scrollDuration = 500;
						}

						else if ($(buttonArray[i]).offset().top <= $(groupArray[i - 1]).offset().top && allButtonArray.length == 1) {
							scrollDuration = 500;
						}
						else if ($(buttonArray[i]).offset().top > 495 && $(buttonArray[i]).offset().top < 1700 && !inRange($(buttonArray[i]).offset().top, $(groupArray[i - 1]).position().top, bottom)) {
							scrollDuration = 1000;
						}
						else if ($(buttonArray[i]).offset().top > 1701 && $(buttonArray[i]).offset().top < 3000 && !inRange($(buttonArray[i]).offset().top, $(groupArray[i - 1]).position().top, bottom)) {
							scrollDuration = 1500;
							//console.log("slower");
						}
						else if ($(buttonArray[i]).offset().top > 3001 && $(buttonArray[i]).offset().top < 6000 && !inRange($(buttonArray[i]).offset().top, $(groupArray[i - 1]).position().top, bottom)) {
							scrollDuration = 2000;
						}
						else if ($(buttonArray[i]).offset().top > 6001 && !inRange($(buttonArray[i]).offset().top, $(groupArray[i - 1]).position().top, bottom)) {
							scrollDuration = 2500;
							console.log("the slowest");
						}
						else {
							scrollDuration = 500;
						}
						//to prevent the various hover states to take control when the button isn't floating
						if (!($(buttonArray[i])).hasClass("float")) {
							scrollDuration = 0;
							console.log("doesnt have class")
						}
						// on mouse in, start a timeout
						timer = setTimeout(function () {

							//the delay for the hover scroll feature
							htmlBody.animate({ scrollTop: $(groupArray[i - 1]).offset().top }, scrollDuration, 'easeInOutCubic');
						}, delay);
					}, function () {
						// on mouse out, cancel the timer
						clearTimeout(timer);
					});

					$.each(allButtonArray, function (j, val) {
						$(allButtonArray[j]).appendTo(closeBar);
						console.log(allButtonArray.length);
						arrowDown.show();
						arrowUp.show();
						arrowDown.prependTo(closeBar);
						arrowUp.appendTo(closeBar);
						//Changes the width of the buttons based upon how many are on the screen
						if (allButtonArray.length > 7) {
							setTimeout(function () { $(val).css({ opacity: "0.9", width: "7%", transform: "scale(1)" }) }, 1200);
							allButtonArray.sort(sortElements);
							allButtonArrayFixString.sort(sortElements2);
						}

						else {
							setTimeout(function () { $(val).css({ opacity: "0.9", transform: "scale(1)", width: "10%" }) }, 1200);
							allButtonArray.sort(sortElements);
							allButtonArrayFixString.sort(sortElements2);
						}
					});
				}
				if ($(groupArray[i - 1]).height() == 0) {
					console.log("yes");
					$(buttonArray[i]).css({ width: '50%', opacity: "1", transform: "scale(1)" });
					allButtonArray.splice($.inArray($(buttonArray[i]).text(), allButtonArrayFixString), 1);
					allButtonArrayFixString.splice($.inArray($(buttonArray[i]).text(), allButtonArrayFixString), 1);
					$(buttonArray[i]).appendTo($(closeBarArray[i]));

				}
				setTimeout(function () {
					if (allButtonArray.length == 0) {
						disableAnimation();
						window.removeEventListener("scroll", scrollBarrier);
						$(buttonArray[i]).css({ width: '50%', opacity: "1", transform: "scale(1)" });
						closeBar.css({ zIndex: "1", height: "0" });
						primaryNav.removeClass('primary-nav--float-bar-is-open');
						arrowDown.fadeOut("slow");
						arrowUp.fadeOut("slow");
						overall.on("click", function () {
							trainClick();
						});
						$(overall).removeClass("overallInsertsTotal2");
					}
				}, 100);
			});
			$(buttonArray[i]).toggleClass("openClose");
			$(buttonArray[i]).toggleClass("openClose2");
		});
	});

	function inRange(x, min, max) {
		return (x >= min && x <= max);
	}

	function disableAnimation() {
		//This will stop any animations if the user scrolls.
		htmlBody.bind("scroll mousedown DOMMouseScroll mousewheel keyup", function (e) {
			if (e.which > 0 || e.type === "mousedown" || e.type === "mousewheel") {
				htmlBody.stop().unbind('scroll mousedown DOMMouseScroll mousewheel keyup');
			}
		});
	}
	/*for adding up the lis in the various pages*/

	$.each(groupArray, function (i, item) {
		var olGroup = $(groupArray[i]).find(li).length;
		var totalInsertsNum = $(groupArray[i]).attr('data-value');
		totalNumArray.push(totalInsertsNum);
		//Finds all the elements with the class name of red
		var totalRedAsterisks = $(groupArray[i]).find(redAsterisks).length;
		var totalMinusGone = olGroup - totalRedAsterisks;
		totalMinusGoneOverall.push(totalMinusGone);
		var formatIndividualNumber = 100 * (totalMinusGone) / totalInsertsNum;
		var totalItemsString = "Completion Stats: " + totalMinusGone + "/" + totalInsertsNum + " or "
			+ parseFloat(formatIndividualNumber.toFixed(1)) + "%";
		$(totalArray[i]).text(totalItemsString);
		//for the tooltip
		var theTitle = $(buttonArray[i + 1]).attr('title', totalItemsString);
		//for adding the totals in totalNumArray 
	});
	var totals = 0;
	$.each(totalNumArray, function () { totals += parseFloat(this) || 0; });
	var formatOverallNumber = 100 * (overallGroup) / totals;
	//the string for the hmtl for the overallTotal ID
	$(overallTotal).text(overallGroup + "/" + totals + " or "
		+ parseFloat(formatOverallNumber.toFixed(1)) + "%");

	arrowDown.click(function () {
		htmlBody.animate({ scrollTop: $(document).height() }, 600);
	});

	arrowUp.click(function () {
		htmlBody.animate({ scrollTop: revealAllButton.offset().top - 75 }, 500);
	});
	menuButton.on("click", function () {
		$(this).toggleClass("menu-is-open");
		primaryNav.on("webkitTransitionEnd transitionend").toggleClass("primary-nav--is-visible")
	});
	$(".arrow-up2").click(function () {
		$("html, body").animate({ scrollTop: 0 }, 700, "easeInOutCubic")
	});
});
