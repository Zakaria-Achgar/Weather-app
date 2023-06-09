const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherbox = document.querySelector('.weather-box');
const weatherdetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', () =>{
    const apiKey ='29ddb8b51361ce0ee0a0af54f2afc67e';
    const city = document.querySelector('.search-box input').value;

    if (city === '')
    return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`).then(
        response => response.json()).then(json => {
             if(json.cod === '404'){
                container.style.height = '400px';
                weatherbox.style.display = 'none';
                weatherdetails.style.display = 'none';
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
             
            switch(json.weather[0].main){
                case 'Clear':
                    image.src= 'img/clear.png';
                    break;
                case 'Rain':
                    image.src= 'img/rain.png';
                    break;
                case 'Snow':
                    image.src= 'img/snow.png';
                    break;
                case 'Clouds':
                    image.src= 'img/cloud.png';
                    break;
                case 'Haze':
                    image.src= 'img/haze.png';
                    break;

                default:
                    image.src = '';
            }


            console.log(json)

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

            weatherbox.style.display = '';
            weatherdetails.style.display = '';
            weatherbox.classList.add('fadeIn');
            weatherdetails.classList.add('fadeIn');
            container.style.height = '590px';
        
        
        });
}) 



