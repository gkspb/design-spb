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

//анимация скролла
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


//прокрутка по блокам
$(function () {
	$.scrollify({
		section: ".section",
	});
});

//настройка прокрутки
$.scrollify({
	section: "section",
	interstitialSection: "",
	easing: "easeOutExpo",
	scrollSpeed: 1100,
	offset: 0,
	scrollbars: true,
	standardScrollElements: "",
	setHeights: true,
	overflowScroll: true,
	updateHash: true,
	touchScroll: true,
	before: function (index, sections) {
		let targetBlockClass = "target-block";
		if (sections[index].hasClass(targetBlockClass)) {
			$(".header-text").addClass("header_black");
			$(".icon-white").addClass("none");
			$(".icon-black").removeClass("none");
			$(".header").addClass("header_small-padding");
			$(".header-wrapper").addClass("header_small-margin");
		} else {
			$(".header-text").removeClass("header_black");
			$(".icon-white").removeClass("none");
			$(".icon-black").addClass("none");
			$(".header").removeClass("header_small-padding");
			$(".header-wrapper").removeClass("header_small-margin");
		}
	},
});



//настройка слайдеров
let swiper = new Swiper(".mySwiper", {
	loop: true,
	spaceBetween: 20,
	slidesPerView: 4,
	freeMode: true,
	watchSlidesProgress: true,
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
	effect: "fade",
});

let swiper3 = new Swiper(".mySwiper3", {
	slidesPerView: 2.2,
	grid: {
		rows: 2,
	},
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
			console.log('event.target', this.clickedIndex);
			swiper4.slideTo(this.clickedIndex);
		},
	},
});

//Смена картинок в разделе "Выберите стиль вашего дизайна"
let section = document.querySelector('.choise');
swiper4.on('slideChangeTransitionEnd', function () {
	let activeSlideIndex = swiper4.activeIndex;
	let backgroundImages = [
		'../../img/loft.png',
		'../../img/modern.png',
		'../../img/minimalizm.png',
		'../../img/loft.png',
	];
	if (activeSlideIndex < 0) {
		activeSlideIndex = backgroundImages.length - 1;
	}
	let activeBackgroundImage = backgroundImages[activeSlideIndex];
	section.style.backgroundImage = `url(${activeBackgroundImage})`;
});

const callBtn = document.querySelector('.call-btn');
const linkTel = document.querySelector('.link-tel');
const addClassOnHover = () => {
	linkTel.classList.add('link-tel-hover');
}
const removeClassOnHover = () => {
	linkTel.classList.remove('link-tel-hover');
}
callBtn.addEventListener('mouseover', addClassOnHover);
callBtn.addEventListener('mouseout', removeClassOnHover);
