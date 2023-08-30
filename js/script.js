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
		280: {
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
	slidesPerView: 2,
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
		280: {
			slidesPerView: 1,
		},
		767: {
			slidesPerView: 2
		}
	}
});

let swiper5 = new Swiper(".mySwiper5", {
	spaceBetween: 10,
	slidesPerView: 4,
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
	breakpoints: {
		250: {
			slidesPerView: 1
		},
		650: {
			slidesPerView: 2
		},
		767: {
			slidesPerView: 3
		},
		1023: {
			slidesPerView: 4
		}
	}
});

//проверка на горизонтальных экранах
if (window.innerHeight < 400) {
	let headerElement = document.querySelector('header');
	if (headerElement) {
		headerElement.classList.add('substrate');
	}
}


if ($('body').hasClass('scrollify-page') && window.innerHeight > 400) {
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
			$(".header").addClass("substrate_white");
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
			$(".header").removeClass("substrate_white");
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


// Функция для получения текущего блока с использованием Scrollify
function getCurrentSection() {
	let currentSection = null;
	const activeIndex = $.scrollify.current().index();
	const sections = [$("#1"), $("#2"), $("#3"), $("#4"), $("#5"), $("#6"), $("#7"), $("#8"), $("#9"), $("#10"), $("#11")];
	if (activeIndex >= 0 && activeIndex < sections.length) {
		currentSection = sections[activeIndex];
	}
	return currentSection;
}
$(document).on('click', '#menu-toggle', function () {
	$(this).toggleClass('menu-burger--is-active');
	let currentSection = getCurrentSection();
	updateStyles(currentSection);
});

//бургер
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
            
            if (mobileMenu.classList.contains('mobile-nav_bottom-active')) {
                $('.main').addClass('main-opacity');
                $('.header').addClass('header-mobile');
                $('.nav-item').removeClass('header_black');
				$('.mobile-nav_bottom-wrapper').addClass('mobile-nav_bottom-wrapper-100')
                document.body.style.overflow = "hidden";
                mobileMenu.style.overflow = "auto"; // Allow scrolling in open state
            } else {
                $('.main').removeClass('main-opacity');
                $('.header').removeClass('header-mobile');
				$('.mobile-nav_bottom-wrapper').removeClass('mobile-nav_bottom-wrapper-100')
                document.body.style.overflow = "auto";
                mobileMenu.style.overflow = "hidden"; // Reset overflow to prevent scrolling in closed state
            }
        });
    }
});



//аккордеон футер/шапка
$(document).ready(function () {
    function handleAccordion() {
        var screenWidth = window.innerWidth;
        if (screenWidth < 767) {
            $('.accordeon-text').click(function () {
                var item = $(this).closest('.accordeon-item');
                var content = item.find('.accordeon-content');
                var isOpen = item.hasClass('open');
                $('.accordeon-item').removeClass('open');
                $('.accordeon-content').slideUp(500);
                if (!isOpen) {
                    item.addClass('open');
                    content.slideDown(500);
                }
            });
        } else {
            $('.accordeon-text').off('click');
            $('.accordeon-content').show(); 
        }
    }
    handleAccordion(); 
    $(window).resize(handleAccordion); 
});





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

//убрать блюр
function removeBlur(element) {
	element.removeEventListener("mouseover", removeBlur);
	var blurElement = element.querySelector(".item-blur");
	if (blurElement) {
		blurElement.style.opacity = "0";
		setTimeout(function () {
			blurElement.remove();
		}, 1000);
	}
}

