const domReady = function (callback) {
	document.readyState === "interactive" || document.readyState === "complete" ? callback() : document.addEventListener("DOMContentLoaded", callback);
};

domReady(function () {
	const config = {
		apiKey: "AIzaSyDMn-sNlJ5lIF1YVeLqujt_JXCL_Ac8tO8",
		authDomain: "roy-oswalt-collection.firebaseapp.com",
		databaseURL: "https://roy-oswalt-collection.firebaseio.com",
		projectId: "roy-oswalt-collection",
		storageBucket: "roy-oswalt-collection.appspot.com",
		messagingSenderId: "81132660105"
	};
	firebase.initializeApp(config);
	const db = firebase.firestore();

	Vue.component('card-component', {
		template: `
    <li>
      <figure class="figure-list__figure">
        <figcaption class="figure-list__caption">
					<span v-html="buildCardString(card, inlineStyles = true)"></span>
					<div class="card-list-intro__header card-list-intro__header--sub">Updated: <time :datetime="card.date_updated.toDate().toISOString()" :title="card.date_updated.toDate().toISOString()">{{buildLastUpdated(card.date_updated)}}</time></div>
				</figcaption>
				<a v-if="card.img_src && !Array.isArray(card.img_src)" aria-label="Open Image in Gallery" data-fancybox="recently-added" data-hash="recently-added" :data-caption="buildCardString(card)" :href="card.img_src">
					<img alt="" :data-src="card.img_src" :class="[card.img_size, 'lazyload', 'thumbnail']">
				</a>
				<a v-else aria-label="Open Image in Gallery" data-fancybox="recently-added" data-hash="recently-added" :data-caption="buildCardString(card)" :href="card.img_src[card.img_src.length - 1]">
					<img alt="" :data-src="card.img_src[card.img_src.length - 1]" :class="[card.img_size, 'lazyload', 'thumbnail']">
				</a>
      </figure>
    </li>
    `,
		props: {
			card: {}
		},
		methods: {
			buildCardString: function (card, inlineStyles = false) {
				let baseString = card.year + ' ' + card.set + ' #' + card.number;
				if (card.other_info) {
					baseString += ' ' + card.other_info;
				}
				if (card.other_players) {
					baseString += ' w/' + card.other_players;
				}
				if (card.serial_numbered) {
					let serialNumbered = card.serial_numbered;
					if (Array.isArray(serialNumbered)) {
						serialNumbered = serialNumbered.join(', ');
						let lastCommma = serialNumbered.lastIndexOf(', ');
						serialNumbered = serialNumbered.substring(0, lastCommma) + serialNumbered.substring(lastCommma + 2);
					}
					if (inlineStyles) {
						baseString += ' <span class="figure-list__caption--serial" title="serial numbered">' + serialNumbered + '</span>';
					}
					else {
						baseString += ' ' + serialNumbered;
					}
				}
				if (card.grade) {
					let grade = card.grade;
					if (Array.isArray(grade)) {
						grade = grade.join(', ');
					}
					baseString += ' ' + grade;
				}
				return baseString;
			},
			buildLastUpdated: function (data) {
				return data.toDate().toLocaleDateString('en-US',
					{ year: 'numeric', month: 'short', day: 'numeric' });
			}
		}
	});

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
			],
			menuIsOpen: false,
			recentlyUpdated: []
		},
		created: function () {
			db.collection('cards/cards_document/cards_subcollection').doc('overall_totals').get().then((snapshot) => {
				this.initialTotals = snapshot.data()['totals'];
				this.overallTotals = this.initialTotals;
			});
			db.collection('cards/cards_document/cards_subcollection').doc('recently_updated').get().then((snapshot) => {
				this.recentlyUpdated = snapshot.data()['cards'];
			});
		},
		updated: function () {
			this.startFancybox();
			this.triggerFancyboxHash();
			$(window).on('hashchange', this.triggerFancyboxHash);
		},
		methods: {
			startFancybox: function () {
				// TODO: Possibly find a way to remove the appended index number in the custom `data-hash`
				// without messing up the back button and history.
				$('[data-fancybox="recently-added"]').fancybox({
					loop: true,
					animationEffect: 'fade',
					animationDuration: 300,
					buttons: [
						"zoom",
						"slideShow",
						"fullScreen",
						"thumbs",
						"close"
					]
				});
			},
			triggerFancyboxHash: function () {
				let hash = window.location.hash
				let allRecentlyAdded = $('a[data-hash]');
				if (hash != '') {
					hash = hash.replace(hash, hash.substr(1));
					let parts = hash.split('-');
          let lastPart = Number(parts.pop());
					allRecentlyAdded.eq(lastPart - 1).trigger('click');
				}
			},
			toggleMenuButton: function () {
				if (this.menuIsOpen) {
					return this.menuIsOpen = false
				}
				return this.menuIsOpen = true;
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
