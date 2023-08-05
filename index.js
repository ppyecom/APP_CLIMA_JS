const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const container_2 = document.querySelector('.container-2');
let map;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
  });
}

search.addEventListener('click', async () => {
  const APIKey = 'b3a2b0478e63dbb7c8e1c6f25ad43e62';
  const city = document.querySelector('.search-box input').value;
  const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`;

  if (city === '') return;

  try {
    const response = await fetch(API_URL);
    const json = await response.json();
    console.log(json);

    if (json.cod === '404') {
      container.style.height = '400px';
      container_2.style.height = '400px';
      weatherBox.style.display = 'none';
      weatherDetails.style.display = 'none';
      error404.style.display = 'block';
      error404.classList.add('fadeIn');
      return;
    }

    error404.style.display = 'none';
    error404.classList.remove('fadeIn');

    const image = document.querySelector('.weather-box img');
    const temperature = document.querySelector('.weather-box .temperature');
    const description = document.querySelector('.weather-box .description');
    const humidity = document.querySelector('.weather-details .humidity span');
    const wind = document.querySelector('.weather-details .wind span');

    switch (json.weather[0].main) {
      case 'Clear':
        image.src = 'images/clear.png';
        break;

      case 'Rain':
        image.src = 'images/rain.png';
        break;

      case 'Snow':
        image.src = 'images/snow.png';
        break;

      case 'Clouds':
        image.src = 'images/cloud.png';
        break;

      case 'Haze':
        image.src = 'images/haze.png';
        break;

      default:
        image.src = '';
    }

    temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
    description.innerHTML = `${json.weather[0].description}`;
    humidity.innerHTML = `${json.main.humidity}%`;
    wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

    weatherBox.style.display = '';
    weatherDetails.style.display = '';
    weatherBox.classList.add('fadeIn');
    weatherDetails.classList.add('fadeIn');
    container.style.height = '590px';
    container_2.style.height = '590px';
  } catch (error) {
    console.error('Error:', error);
  }
});
