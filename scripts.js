var domReady = function (callback) {
	document.readyState === "interactive" || document.readyState === "complete" ? callback() : document.addEventListener("DOMContentLoaded", callback);
};

domReady(function () {
	var config = {
		apiKey: "AIzaSyDMn-sNlJ5lIF1YVeLqujt_JXCL_Ac8tO8",
		authDomain: "roy-oswalt-collection.firebaseapp.com",
		databaseURL: "https://roy-oswalt-collection.firebaseio.com",
		projectId: "roy-oswalt-collection",
		storageBucket: "roy-oswalt-collection.appspot.com",
		messagingSenderId: "81132660105"
	};
	firebase.initializeApp(config);
	const db = firebase.firestore();

	window.app = new Vue({
		el: '#wrapper',
		data: {
			initialTotals: null,
			overallTotals: [
				{
					autos: {
						overall_total: '',
						total: ''
					}
				},
				{
					base_inserts_parallels: {
						overall_total: '',
						total: ''
					}
				},
				{
					gu: {
						overall_total: '',
						total: ''
					}
				},
				{
					ones: {
						overall_total: '',
						total: ''
					}
				},
				{
					rcs: {
						overall_total: '',
						total: ''
					}
				},
				{
					overall: {
						overall_total: '',
						total: ''
					}
				}
			]
		},
		created: function () {
			db.collection('cards/cards_document/cards_subcollection').doc('overall_totals').get().then((snapshot) => {
				this.initialTotals = snapshot.data()['totals'];
				this.overallTotals = this.initialTotals;
			});
		},
		methods: {
			toggleMenuButton: function (event) {
        $(event.target).toggleClass('menu-is-open');
		    $('#primary-nav').toggleClass('primary-nav--is-visible');
      }
		}
	});
	var circleRight = document.getElementById('arrowRight');
	var circleLeft = document.getElementById("circleLeft");
	var i = 0;
	var imageGroupArray = document.getElementsByClassName("imageGroup");
	var getTransitionDelay = getStyle(imageGroupArray[0], "transition-duration");
	getTransitionDelay.replace(/\D/g, '');
	var transitionDelay = parseFloat(getTransitionDelay) * 1000;
	var imageGroupImage2 = document.querySelectorAll(".imageGroup img:nth-of-type(2)");
	var imageGroupImage3 = document.querySelectorAll(".imageGroup img:nth-of-type(3)");

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
});
