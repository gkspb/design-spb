//маска номера 
window.addEventListener("DOMContentLoaded", function () {
	[].forEach.call(document.querySelectorAll('.tel'), function (input) {
		let keyCode;
		function mask(event) {
			event.keyCode && (keyCode = event.keyCode);
			let pos = this.selectionStart;
			if (pos < 3) event.preventDefault();
			let matrix = "+7 (___) ___-__-__",
				i = 0,
				def = matrix.replace(/\D/g, ""),
				val = this.value.replace(/\D/g, ""),
				new_value = matrix.replace(/[_\d]/g, function (a) {
					return i < val.length ? val.charAt(i++) : a
				});
			i = new_value.indexOf("_");
			if (i != -1) {
				i < 5 && (i = 3);
				new_value = new_value.slice(0, i)
			}
			let reg = matrix.substr(0, this.value.length).replace(/_+/g,
				function (a) {
					return "\\d{1," + a.length + "}"
				}).replace(/[+()]/g, "\\$&");
			reg = new RegExp("^" + reg + "$");
			if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) {
				this.value = new_value;
			}
			if (event.type == "blur" && this.value.length < 5) {
				this.value = "";
			}
		}
		input.addEventListener("input", mask, false);
		input.addEventListener("focus", mask, false);
		input.addEventListener("blur", mask, false);
		input.addEventListener("keydown", mask, false);
	});
});

//анимация скролла по якорям
$(document).ready(function () {
	$(".nav__link").on('click', function (event) {
		if (this.hash !== "") {
			event.preventDefault();
			let hash = this.hash;
			$('html, body').animate({
				scrollTop: $(hash).offset().top
			}, 1000, function () {
				window.location.hash = hash;
			});
		}
	});
});

//настройка слайдеров
let swiper = new Swiper(".mySwiper", {
	loop: true,
	spaceBetween: 20,
	slidesPerView: 4,
	breakpoints: {
		320: {
			slidesPerView: 2,
			spaceBetween: 0,
		},
		767: {
			slidesPerView: 4
		}
	}
});

let swiper2 = new Swiper(".mySwiper2", {
	loop: true,
	spaceBetween: 10,
	thumbs: {
		swiper: swiper,
	},
	autoplay: {
		delay: 3000,
		disableOnInteraction: false,
	},
});

let swiper3 = new Swiper(".mySwiper3", {
	slidesPerView: 2.2,
	autoplay: {
		delay: 4000,
		disableOnInteraction: false,
	},
	spaceBetween: 20,
	pagination: {
		el: ".swiper-pagination",
		clickable: true,
	},
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
	breakpoints: {
		320: {
			slidesPerView: 1,
		},
		767: {
			slidesPerView: 2.2
		}
	}
});

let swiper4 = new Swiper(".mySwiper4", {
	direction: "vertical",
	slidesPerView: 3,
	spaceBetween: 20,
	slidesPerGroup: 1,
	centeredSlides: true,
	initialSlide: 2,
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
	autoplay: {
		delay: 3000,
		disableOnInteraction: false,
	},
	loop: true,
	loopedSlides: 2,
	on: {
		click(event) {
			swiper4.slideTo(this.clickedIndex);
		},
	},
});

let swiper5 = new Swiper(".mySwiper5", {
	spaceBetween: 10,
	slidesPerView: 3.5,
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
	breakpoints: {
		320: {
			slidesPerView: 1.5,
		},
		767: {
			slidesPerView: 2.5
		},
		1023: {
			slidesPerView: 3.5
		}
	}
});

//Смена картинок в разделе "Выберите стиль вашего дизайна"
let section = document.querySelector('.choise');
swiper4.on('slideChangeTransitionEnd', function () {
	let activeSlideIndex = swiper4.activeIndex;
	let backgroundImageNames = [
		'loft.png',
		'minimalizm.png',
		'loft.png',
		'minimalizm.png'
	];
	if (activeSlideIndex < 0) {
		activeSlideIndex = backgroundImageNames.length - 1;
	}
	let currentPath = window.location.href;
	let currentFolder = currentPath.substring(0, currentPath.lastIndexOf('/'));
	let activeBackgroundImage = `${currentFolder}/img/${backgroundImageNames[activeSlideIndex]}`;
	section.style.backgroundImage = `url(${activeBackgroundImage})`;
});





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
		after: function (index, sections) {
			updateStyles(sections[index]);
		},
	});

	// Функция обновления стилей
	function updateStyles(currentSection) {
		let targetBlockClass = "target-block";
		if (currentSection.hasClass(targetBlockClass)) {
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

	// Вызов функции обновления стилей при скролле и при загрузке страницы
	$(document).ready(function () {
		let currentIndex = $.scrollify.currentIndex();
		let currentSection = $(".section").eq(currentIndex);
		updateStyles(currentSection);

		$(window).on('scroll', function () {
			let currentIndex = $.scrollify.currentIndex();
			let currentSection = $(".section").eq(currentIndex);
			updateStyles(currentSection);
		});
	});
};


// if ($('body').hasClass('scrollify-page')) {
// 	// Настройка Scrollify
// 	$.scrollify({
// 		section: ".section",
// 		interstitialSection: "",
// 		easing: "easeOutExpo",
// 		scrollSpeed: 1000,
// 		offset: 0,
// 		scrollbars: true,
// 		standardScrollElements: "",
// 		setHeights: true,
// 		overflowScroll: true,
// 		updateHash: true,
// 		touchScroll: true,
// 		updateHash: false,
// 		after: function (index, sections) {
// 			function updateStyles() {
// 				let targetBlockClass = "target-block";
// 				if (sections[index].hasClass(targetBlockClass)) {
// 					$(".header").addClass("header_small-padding");
// 					$(".header-wrapper").addClass("header_small-margin");
// 					if ($('.mobile-nav_bottom').hasClass('mobile-nav_bottom-deactive')) {
// 						$(".header-text").addClass("header_black");
// 						$(".menu-item").addClass("menu-item_black");
// 						$(".menu-burger").addClass("menu-burger_black");
// 						$(".icon-white").addClass("none");
// 						$(".icon-black").removeClass("none");
// 					} else {
// 						$(".header-text").removeClass("header_black");
// 						$(".menu-item").removeClass("menu-item_black");
// 						$(".menu-burger").removeClass("menu-burger_black");
// 					}
// 				} else {
// 					$(".header-text").removeClass("header_black");
// 					$(".icon-white").removeClass("none");
// 					$(".icon-black").addClass("none");
// 					$(".header").removeClass("header_small-padding");
// 					$(".header-wrapper").removeClass("header_small-margin");
// 					$(".menu-burger").removeClass("menu-burger_black");
// 					$(".menu-item").removeClass("menu-item_black");
// 				}
// 			}
// 			updateStyles();
// 			$(window).on('scroll', function () {
// 				updateStyles();
// 			});
// 			$('#menu-toggle').on('click', function () {
// 				updateStyles();
// 			});
// 		},
// 	});
// };


// Функция для получения текущего блока с использованием Scrollify
function getCurrentSection() {
    let currentSection = null;
    
    // Получаем текущий активный блок Scrollify
    const activeIndex = $.scrollify.current().index();
    
    // Предположим, что у вас есть массив секций, которые вы хотите отслеживать
    // Замените этот массив на фактический список секций на вашем сайте
    const sections = [$("#1"), $("#2"), $("#3"), $("#4"), $("#5"), $("#6"), $("#7"), $("#8"), $("#9"), $("#10"), $("#11")];
    
    // Проверяем, в каком блоке находится активный индекс Scrollify
    if (activeIndex >= 0 && activeIndex < sections.length) {
        currentSection = sections[activeIndex];
    }
    
    return currentSection;
}

$(document).on('click', '#menu-toggle', function () {
    $(this).toggleClass('menu-burger--is-active');
    
    // Получаем текущий блок и вызываем функцию обновления стилей
    let currentSection = getCurrentSection(); // Здесь реализуйте получение текущего блока
    updateStyles(currentSection);
});

document.addEventListener('DOMContentLoaded', function () {
    let btnBurger = document.querySelector('.menu-burger');
    if (btnBurger) {
        btnBurger.addEventListener('click', function () {
            let mobileMenu = document.querySelector('.mobile-nav_bottom');
            let mobileNav = document.querySelector('.mobile-nav');
            let header = document.querySelector('.header');
            mobileMenu.classList.toggle('mobile-nav_bottom-active');
            mobileMenu.classList.toggle('mobile-nav_bottom-deactive');
            mobileNav.classList.toggle('mobile-nav-active');
            
            // Получаем текущий блок и вызываем функцию обновления стилей
            let currentSection = getCurrentSection(); // Здесь реализуйте получение текущего блока
            updateStyles(currentSection);
            
            if (mobileMenu.classList.contains('mobile-nav_bottom-active')) {
                $('.main').addClass('main-opacity');
                $('.header').addClass('header-mobile');
                $('.nav-item').removeClass('header_black');
                document.body.style.overflow = "hidden";
            } else {
                $('.main').removeClass('main-opacity');
                $('.header').removeClass('header-mobile');
                document.body.style.overflow = "auto";
            }
        });
    }
});



//меню бургер
// $(document).on('click', '#menu-toggle', function () {
// 	$(this).toggleClass('menu-burger--is-active');
// });
// document.addEventListener('DOMContentLoaded', function () {
// 	let btnBurger = document.querySelector('.menu-burger');
// 	if (btnBurger) {
// 		btnBurger.addEventListener('click', function () {
// 			let mobileMenu = document.querySelector('.mobile-nav_bottom');
// 			let mobileNav = document.querySelector('.mobile-nav');
// 			let header = document.querySelector('.header');
// 			mobileMenu.classList.toggle('mobile-nav_bottom-active');
// 			mobileMenu.classList.toggle('mobile-nav_bottom-deactive');
// 			mobileNav.classList.toggle('mobile-nav-active');
// 			let targetBlockClass = "target-block";
// 			if (mobileMenu.classList.contains('mobile-nav_bottom-active')) {
// 				$('.main').addClass('main-opacity');
// 				$('.header').addClass('header-mobile');
// 				$('.nav-item').removeClass('header_black');
// 				document.body.style.overflow = "hidden";
// 			} else {
// 				$('.main').removeClass('main-opacity');
// 				$('.header').removeClass('header-mobile');
// 				document.body.style.overflow = "auto";
// 				// if () {
// 				// 	$('.nav-item').addeClass('header_black');
// 				// } else {
// 				// 	$('.nav-item').removeClass('header_black');
// 				// }
// 			}
// 		});
// 	}
// });

//аккордеон футер
$(document).ready(function () {
	const breakpoint = 767; // Пороговое значение для медиазапроса
	function initializeAccordion() {
		$('.footer-item').each(function () {
			const $footerItem = $(this);
			const $footerText = $footerItem.find('.footer-text');
			const $links = $footerItem.find('.links');
			$links.hide(); 
			$footerText.on('click', function () {
				if ($(window).width() <= breakpoint) {
					$links.slideToggle();
					$footerItem.toggleClass('open');
					$footerText.find('i.fa').toggleClass('fa-chevron-down fa-minus');
				}
			});
		});
	}

	function resetAccordion() {
		$('.footer-item').removeClass('open').find('.links').removeAttr('style');
		$('.footer-text i.fa').removeClass('fa-minus').addClass('fa-chevron-down');
	}

	$(window).on('load resize', function () {
		if ($(window).width() <= breakpoint) {
			initializeAccordion();
		} else {
			resetAccordion();
		}
	});
});

// $(document).ready(function () {
// 	const breakpoint = 767; // Пороговое значение для медиазапроса

// 	function initializeAccordion() {
// 		$('.footer-item').each(function () {
// 			const $footerItem = $(this);
// 			const $footerText = $footerItem.find('.footer-text');
// 			const $links = $footerItem.find('.links');

// 			$links.hide(); // Скрываем блоки .links по умолчанию

// 			$footerText.on('click', function () {
// 				if ($(window).width() <= breakpoint) {
// 					$links.slideToggle();
// 					$footerItem.toggleClass('open');
// 					$footerText.find('i.fa').toggleClass('fa-chevron-down fa-minus');
// 				}
// 			});
// 		});
// 	}

// 	function resetAccordion() {
// 		$('.footer-item').removeClass('open').find('.links').removeAttr('style');
// 		$('.footer-text i.fa').removeClass('fa-minus').addClass('fa-chevron-down');
// 	}

// 	$(window).on('load resize', function () {
// 		if ($(window).width() <= breakpoint) {
// 			initializeAccordion();
// 		} else {
// 			resetAccordion();
// 		}
// 	});
// });

// до/после меняем картинки
const beforeButton = document.querySelector('.difference__before');
const afterButton = document.querySelector('.difference__after');
const imgElement = document.querySelector('.difference__img');
const beforeImagePath = 'img/before.png';
const afterImagePath = 'img/after.png';

if (beforeButton && afterButton && imgElement) {
    beforeButton.addEventListener('click', () => {
        imgElement.style.opacity = '0';
        setTimeout(() => {
            imgElement.src = beforeImagePath;
            imgElement.style.opacity = '1';
        }, 300);
        beforeButton.classList.add('btn-active');
        afterButton.classList.remove('btn-active');
    });

    afterButton.addEventListener('click', () => {
        imgElement.style.opacity = '0';
        setTimeout(() => {
            imgElement.src = afterImagePath;
            imgElement.style.opacity = '1';
        }, 300);
        afterButton.classList.add('btn-active');
        beforeButton.classList.remove('btn-active');
    });
}




//подсказка в таблице
const icons = document.querySelectorAll('.icon');
icons.forEach(icon => {
	icon.addEventListener('mouseover', () => {
		const tooltip = icon.nextElementSibling;
		tooltip.style.display = 'block';
	});

	icon.addEventListener('mouseout', () => {
		const tooltip = icon.nextElementSibling;
		tooltip.style.display = 'none';
	});
});





function removeBlur(element) {
	element.removeEventListener("mouseover", removeBlur);

	var blurElement = element.querySelector(".item-blur");
	if (blurElement) {
		blurElement.style.opacity = "0";
		setTimeout(function() {
			blurElement.remove();
		}, 1000);
	}
}

// document.addEventListener("DOMContentLoaded", function() {
//     var blocks = document.querySelectorAll(".your-block-class"); // Замените ".your-block-class" на соответствующий селектор

//     blocks.forEach(function(block) {
//         block.addEventListener("mouseover", function() {
//             removeBlur(block);
//         });
//     });
// });
