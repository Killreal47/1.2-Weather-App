function main() {
	const apiKey = 'b17446bb8bcf41c286d75410233108';

	//Элементы на странице
	const header = document.querySelector('.header');
	const form = document.querySelector('#form');
	const inputCity = document.querySelector('#inputCity');



	function removeCard() {
		const prevCard = document.querySelector('.card');
		if (prevCard) {
			prevCard.remove();
		}
	}

	function showError(errorMessage) {
		//Отображаем карточку с ошибкой

		const html = `<div class="card"> ${errorMessage} </div>`;
		//Отображаем карточку на странице
		header.insertAdjacentHTML('afterend', html);
	}

	function showCard({ name, country, temp, condition }) {
		const html = ` <div class="card">
							<h2 class="card-city">${name} <span>${country}</span></h2>
						
							<div class="card-weather">
								<div class="card-value">${temp} <sup>°c</sup></div>
								<img class="card-img" src="./img/icons/snow.png" alt="Weather">
							</div>
						
							<div class="card-description">${condition}</div>
						</div>`;

		//Отображаем карточку на странице
		header.insertAdjacentHTML('afterend', html);
	}

	async function getWether(city) {
		//Адрес запроса
		const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
		const response = await fetch(url);
		const data = await response.json();

		console.log(data);
		return data;
	}

	//Слушаем отправку формы
	form.addEventListener('submit', async function (e) {
		e.preventDefault();

		const city = inputCity.value.trim();
		inputCity.value = '';
		inputCity.focus();

		// Получаем данные с сервера
		const data = await getWether(city);

		//Проверка на ошибку
		if (data.error) {
			removeCard();

			showError(data.error.message);
		} else {
			removeCard();

			const weatherData = {
				name: data.location.name,
				country: data.location.country,
				temp: data.current.temp_c,
				condition: data.current.condition.text,
			};


			showCard(weatherData);
		}
	});









}
export default main;