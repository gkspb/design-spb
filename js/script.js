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

$(function () {
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
				// && window.innerHeight >= 800
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
					// if (window.innerHeight >= 800)
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
			grid: {
				rows: 1,
			},
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


// const callBtn = document.querySelector('.call-btn');
// const linkTel = document.querySelector('.link-tel');
// const addClassOnHover = () => {
// 	linkTel.classList.add('link-tel-hover');
// }
// const removeClassOnHover = () => {
// 	linkTel.classList.remove('link-tel-hover');
// }
// callBtn.addEventListener('mouseover', addClassOnHover);
// callBtn.addEventListener('mouseout', removeClassOnHover);


//меню бургер
$(document).on('click', '#menu-toggle', function () {
	$(this).toggleClass('menu-burger--is-active');
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
			if (mobileMenu.classList.contains('mobile-nav_bottom-active')) {
				$('.main').addClass('main-opacity');
				$('.header').addClass('header-mobile');
				$.scrollify.disable();
				document.body.style.overflow = "hidden";
			} else {
				$('.main').removeClass('main-opacity');
				$('.header').removeClass('header-mobile');
				$.scrollify.enable();
				document.body.style.overflow = "auto";
			}
		});
	}
});



//акордион футер
$(document).ready(function () {
    let resizing = false; 

    $(window).on('load resize', function () {
        if (resizing) {
            return; 
        }

        if ($(window).width() <= 767) {
            let Accordion = function (el, multiple) {
                this.el = el || {};
                this.multiple = multiple || false;
                this.el.find('.links').hide();
                let dropdownlink = this.el.find('.footer-text');
                dropdownlink.on('click',
                    { el: this.el, multiple: this.multiple },
                    this.dropdown);
            };
            Accordion.prototype.dropdown = function (e) {
                let $el = e.data.el,
                    $this = $(this),
                    $next = $this.next();
                $next.slideToggle();
                $this.parent().toggleClass('open');
                let headerIcon = $this.find('i.fa');
                if ($this.parent().hasClass('open')) {
                    headerIcon.removeClass('fa-chevron-down').addClass('fa-minus');
                } else {
                    headerIcon.removeClass('fa-minus').addClass('fa-chevron-down');
                }
                if (!e.data.multiple) {
                    $el.find('.links').not($next).slideUp().parent().removeClass('open');
                    $el.find('.footer-text i.fa').removeClass('fa-minus').addClass('fa-chevron-down');
                }
            };
            let accordion = new Accordion($('.footer-item'), false);
        } else {
            $('.footer-item').removeClass('open').find('.links').show();
            $('.footer-text').off('click');
            $('.footer-text i.fa').removeClass('fa-minus').addClass('fa-chevron-down');
        }
    });

    $(window).on('resize', function () {
        resizing = true;
        resizing = false; 
    });
});





// // Функция для обработки изменений при изменении размера экрана
// function handleScreenResize() {
// 	let screenWidth = window.innerWidth;

// 	// Если экран меньше 550 пикселей
// 	if (screenWidth < 550) {
// 		let consultationBlock = document.querySelector('.consultation');
// 		let footerBlock = document.querySelector('.footer');
// 		let targetBlock = document.getElementById('11');

// 		// Даем блоку consultation нужные классы и атрибуты
// 		consultationBlock.classList.add('target-block', 'section');
// 		consultationBlock.id = '11';

// 		// Даем блоку footer нужные классы и атрибуты
// 		footerBlock.classList.add('section');
// 		footerBlock.id = '12';

// 		// Удаляем блок section_bottom
// 		targetBlock.parentElement.insertBefore(consultationBlock, targetBlock);
// 		targetBlock.parentElement.insertBefore(footerBlock, targetBlock);
// 		targetBlock.remove();
// 	} else {
// 		// Восстанавливаем исходную структуру
// 		let consultationBlock = document.querySelector('.consultation');
// 		let footerBlock = document.querySelector('.footer');
// 		let targetBlock = document.createElement('div');
// 		targetBlock.classList.add('section', 'section_bottom', 'target-block');
// 		targetBlock.id = '11';

// 		targetBlock.appendChild(consultationBlock);
// 		targetBlock.appendChild(footerBlock);

// 		consultationBlock.classList.remove('target-block', 'section');
// 		consultationBlock.removeAttribute('id');

// 		footerBlock.classList.remove('section');
// 		footerBlock.removeAttribute('id');

// 		consultationBlock.parentElement.insertBefore(targetBlock, consultationBlock);
// 		consultationBlock.remove();
// 		footerBlock.remove();
// 	}
// }

// // Вызываем функцию при загрузке страницы и при изменении размера экрана
// window.addEventListener('load', handleScreenResize);
// window.addEventListener('resize', handleScreenResize);
