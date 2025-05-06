const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', async () => {
    const key = '1147411affb440d092e91638250605';
    const q = document.getElementById('search-btn').value;

    if (q === '') return;

    try {
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=1147411affb440d092e91638250605&q=${q}`);
        const data = await response.json();

        
        if (data.error) {
            container.style.height = '450px';
            weatherBox.classList.remove('active');
            weatherDetails.classList.remove('active');
            error404.classList.add('active');
            return;
        }

        container.style.height = '570px';
        weatherBox.classList.add('active');
        weatherDetails.classList.add('active');
        error404.classList.remove('active');

        const image = document.querySelector('.weather-box img');
        const temperature = document.querySelector('.weather-box .temperature');
        const description = document.querySelector('.weather-box .description');
        const humidity = document.querySelector('.weather-details .humidity span');
        const wind = document.querySelector('.weather-details .wind span');

       
        const condition = data.current.condition.text;
        if (condition.includes('Clear')) {
            image.src = './img/clear.png';
        } else if (condition.includes('Rain')) {
            image.src = './img/rain.png';
        } else if (condition.includes('Snow')) {
            image.src = './img?snow.png';
        } else if (condition.includes('Cloud')) {
            image.src = './img/cloud.png';
        } else if (condition.includes('Mist') || condition.includes('Haze')) {
            image.src = './img/mist.png';
        } else {
            image.src = './img/clear.png';
        }

        temperature.innerHTML = `${data.current.temp_c}°C`;
        description.innerHTML = `${data.current.condition.text}`;
        humidity.innerHTML = `${data.current.humidity}%`;
        wind.innerHTML = `${data.current.wind_kph} km/h`;

    } catch (error) {
        console.error('Fetch error:', error);
        error404.classList.add('active');
        weatherBox.classList.remove('active');
        weatherDetails.classList.remove('active');
        container.style.height = '450px';
    }
});
