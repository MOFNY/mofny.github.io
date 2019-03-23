var domReady = function (callback) {
	document.readyState === "interactive" || document.readyState === "complete" ? callback() : document.addEventListener("DOMContentLoaded", callback);
};

domReady(function () {
	//the variables needed for the floating buttons
	var menuButton = $("#menu-button");
	var primaryNav = $("#primary-nav");

	menuButton.on("click", function () {
		$(this).toggleClass("menu-is-open");
		primaryNav.on("webkitTransitionEnd transitionend").toggleClass("primary-nav--is-visible")
	});

	$('#open-all-years').on('click', function() {
		toggleOpen('');
		localStorage.removeItem('keepClosed');
	});

	$('#close-all-years').on('click', function() {
		toggleOpen(false);
		localStorage.setItem('keepClosed', true);
	});

	function toggleOpen(value) {
		$('.details-year').attr('open', value);
	}

	$('.details-year').on('toggle', function () {
		$this = $(this)
		if (!$this.attr('open')) {
			$('html, body').animate({scrollTop: $this.offset().top - 75}, 0);
		}
	});
});
