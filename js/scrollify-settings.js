if ($('body').hasClass('scrollify-page')) {
	// Настройка Scrollify
	$.scrollify({
		section: ".section",
		interstitialSection: "",
		easing: "easeOutExpo",
		scrollSpeed: 1000,
		offset: 0,
		scrollbars: true,
		standardScrollElements: "",
		setHeights: true,
		overflowScroll: true,
		updateHash: true,
		touchScroll: true,
		updateHash: false,
		after: function (index, sections) {
			function updateStyles() {
				let targetBlockClass = "target-block";
				if (sections[index].hasClass(targetBlockClass)) {
					$(".header").addClass("header_small-padding");
					$(".header-wrapper").addClass("header_small-margin");
					if ($('.mobile-nav_bottom').hasClass('mobile-nav_bottom-deactive')) {
						$(".header-text").addClass("header_black");
						$(".menu-item").addClass("menu-item_black");
						$(".menu-burger").addClass("menu-burger_black");
						$(".icon-white").addClass("none");
						$(".icon-black").removeClass("none");
					} else {
						$(".header-text").removeClass("header_black");
						$(".menu-item").removeClass("menu-item_black");
						$(".menu-burger").removeClass("menu-burger_black");
					}
				} else {
					$(".header-text").removeClass("header_black");
					$(".icon-white").removeClass("none");
					$(".icon-black").addClass("none");
					$(".header").removeClass("header_small-padding");
					$(".header-wrapper").removeClass("header_small-margin");
					$(".menu-burger").removeClass("menu-burger_black");
					$(".menu-item").removeClass("menu-item_black");
				}
			}
			updateStyles();
			$(window).on('scroll', function () {
				updateStyles();
			});
			$('#menu-toggle').on('click', function () {
				updateStyles();
			});
		},
	});
};


