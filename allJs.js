var domReady = function (callback) {
	document.readyState === "interactive" || document.readyState === "complete" ? callback() : document.addEventListener("DOMContentLoaded", callback);
};

domReady(function () {
	//the variables needed for the floating buttons
	var menuButton = $("#menu-button");
	var primaryNav = $("#primary-nav");

	menuButton.on("click", function () {
		$(this).toggleClass("menu-is-open");
		primaryNav.on("transitionend").toggleClass("primary-nav--is-visible")
	});
});
