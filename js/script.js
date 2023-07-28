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
	// Добавить плавную прокрутку до всех ссылок
	$(".nav__link").on('click', function (event) {
		// Убедись в этом что .hash имеет значение перед переопределением поведения по умолчанию
		if (this.hash !== "") {
			// Запретить поведение щелчка якоря по умолчанию
			event.preventDefault();
			// Хранить хэш
			let hash = this.hash;
			// Использование метода animate() jQuery для добавления плавной прокрутки страницы
			// Необязательное число (800) указывает количество миллисекунд, необходимых для прокрутки до указанной области
			$('html, body').animate({
				scrollTop: $(hash).offset().top
			}, 1000, function () {
				// Добавить хэш (#) для URL-адреса после завершения прокрутки (поведение щелчка по умолчанию)
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
		} else {
			$(".header-text").removeClass("header_black");
			$(".icon-white").removeClass("none");
			$(".icon-black").addClass("none");
			$(".header").removeClass("header_small-padding");
		}
	},
	after: function () { },
	afterResize: function () { },
	afterRender: function () { }
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
});

let swiper3 = new Swiper(".mySwiper3", {
	slidesPerView: 2.2,
	grid: {
		rows: 2,
	},
	spaceBetween: 20,
	pagination: {
		el: ".swiper-pagination",
		clickable: true,
		renderBullet: function (index, className) {
			return '<span class="' + className + '">' + (index + 1) + "</span>";
		},
	},
});

let swiper4 = new Swiper(".mySwiper4", {
	direction: "vertical",
	slidesPerView: 3,
	spaceBetween: 20,
	slidesPerGroup: 1,
	centeredSlides: true,
	initialSlide: 2,
	loop: true,
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
	on: {
		click(event) {
			console.log('event.target', this.clickedIndex);
			swiper4.slideTo(this.clickedIndex);
		},
	},
});

