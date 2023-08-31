function main() {

	const apiKey = 'b17446bb8bcf41c286d75410233108';

	// http://api.weatherapi.com/v1/current.json?key=b17446bb8bcf41c286d75410233108&q=London


	//Элементы на странице
	const header = document.querySelector('.header');
	const form = document.querySelector('#form');
	const input = document.querySelector('#inputCity');


	//Слушаем отправку формы
	form.addEventListener('submit', (e) => {
		e.preventDefault();

		let city = input.value.trim();
		input.value = '';
		input.focus();

		//Адрес запроса
		const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

		//Делаем запрос на сервер
		fetch(url).then(response => {
			return response.json();
		})
			.then(data => {
				console.log(data);

				//Проверка на ошибку
				if (data.error) {
					//Если есть ошибка - выводим ее

					//Удаляем предыдущие карточки

					const prevCard = document.querySelector('.card');
					if (prevCard) {
						prevCard.remove();
					}

					//Отображаем карточку с ошибкой

					const html = `<div class="card"> ${data.error.message} </div>`;
					//Отображаем карточку на странице
					header.insertAdjacentHTML('afterend', html);

				} else {
					//Удаляем предыдущие карточки
					const prevCard = document.querySelector('.card');
					if (prevCard) {
						prevCard.remove();
					}

					//Разметка для карточки
					const html = ` <div class="card">
											<h2 class="card-city">${data.location.name} <span>${data.location.country}</span></h2>
										
											<div class="card-weather">
												<div class="card-value">${data.current.temp_c} <sup>°c</sup></div>
												<img class="card-img" src="./img/icons/snow.png" alt="Weather">
											</div>
										
											<div class="card-description">${data.current.condition.text}</div>
										</div>`;

					//Отображаем карточку на странице
					header.insertAdjacentHTML('afterend', html);
				}



			});
	});







}



export default main;