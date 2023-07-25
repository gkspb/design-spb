new fullpage('#fullpage', {
	//options here
	autoScrolling: true,
	scrollHorizontally: true,
	anchors: ['firstPage', 'secondPage', 'thirdPage', 'fourthPage', 'fifthPage', 'sixthPage', 'lastPage'],
});

const selectItems = document.querySelectorAll('.select__item');

// Функция добавления класса при наведении
function addClassOnHover() {
	selectItems.forEach(item => item.classList.remove('select_active'));
	this.classList.add('select_active');
}

selectItems.forEach(item => {
	item.addEventListener('mouseover', addClassOnHover);
});

// const blackHedaer = document.querySelectorAll('.section');
// let id = blackHedaer.target.id;
// if (id === 'sectionPage') {
// 	console.log('fdsf')
// }

// // Инициализируем Swiper после загрузки страницы
// document.addEventListener("DOMContentLoaded", function () {
// 	// Инициализируем Swiper с вашими настройками
// 	const mySwiper = new Swiper(".swiper-container", {
// 		// Настройки слайдера
// 		loop: true, // Зацикливание слайдера
// 		navigation: {
// 			nextEl: ".swiper-button-next", // Кнопка "Вперед"
// 			prevEl: ".swiper-button-prev", // Кнопка "Назад"
// 		},
// 	});
// });


window.addEventListener("DOMContentLoaded", function () {
	[].forEach.call(document.querySelectorAll('.tel'), function (input) {
		var keyCode;
		function mask(event) {
			event.keyCode && (keyCode = event.keyCode);
			var pos = this.selectionStart;
			if (pos < 3) event.preventDefault();
			var matrix = "+7 (___) ___-__-__",
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
			var reg = matrix.substr(0, this.value.length).replace(/_+/g,
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