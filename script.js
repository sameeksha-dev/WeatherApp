
// const inputBox = document.querySelector('.input-box');
// const searchBtn = document.getElementById('searchBtn');
// const weather_img = document.querySelector('.weather-img');
// const temperature = document.querySelector('.temperature');
// const description = document.querySelector('.description');
// const humidity = document.getElementById('humidity');
// const wind_speed = document.getElementById('wind-speed');

// const location_not_found = document.querySelector('.location-not-found');

// const weather_body = document.querySelector('.weather-body');


// async function checkWeather(city){
//     // const api_key = "74fa1947287fcb8116ac6ac6465b1701";
//     // const url = `https://api.openweathermap.org/data/2.5/weather?id=${city}&appid=${api_key}`;

//     const api_key = "74fa1947287fcb8116ac6ac6465b1701";
//     const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;


//     const weather_data = await fetch(`${url}`).then(response => response.json());

// //    temperature.innerHTML=`${Math.round(weather_data.main.temp-273.15)}°C`;
// //     description.innerHTML=`${weather_data.weather[0].description}`;
// //     humidity.innerHTML=`${weather_data.main.humidity}%`;
// //     wind_speed.innerHTML=`${weather_data.wind.speed}km/H`;

//     if(weather_data.cod === `404`){
//         location_not_found.style.display = "flex";
//         weather_body.style.display = "none";
//         console.log("error");
//         return;
//     }

//     console.log("run");
//     location_not_found.style.display = "none";
//     weather_body.style.display = "flex";
//     temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;
//     description.innerHTML = `${weather_data.weather[0].description}`;

//     humidity.innerHTML = `${weather_data.main.humidity}%`;
//     wind_speed.innerHTML = `${weather_data.wind.speed}Km/H`;

//      console.log("hii");
//     switch(weather_data.weather[0].main){
//         case 'Clouds':
//             weather_img.src = "./assets/cloud.png";
//             break;
//         case 'Clear':
//             weather_img.src = "./assets/clear.png";
//             break;
//         case 'Rain':
//             weather_img.src = "./assets/rain.png";
//             break;
//         case 'Mist':
//             weather_img.src = "./assets/mist.png";
//             break;
//         case 'Snow':
//             weather_img.src = "./assets/snow.png";
//             break;

//     }

//     console.log(weather_data);
// }


// searchBtn.addEventListener('click', ()=>{
//     checkWeather(inputBox.value);
// });











const inputBox = document.querySelector(".input-box");
const searchBtn = document.getElementById("searchBtn");
const locationBtn = document.getElementById("locationBtn");

const weatherImg = document.querySelector(".weather-img");
const temperature = document.querySelector(".temperature");
const description = document.querySelector(".description");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("wind-speed");

const locationNotFound = document.querySelector(".location-not-found");
const weatherBody = document.querySelector(".weather-body");

const API_KEY = "74fa1947287fcb8116ac6ac6465b1701";

// 1. Function to Update UI (Image matching fix included)
function updateUI(data) {
  if (data.cod === "404") {
    locationNotFound.style.display = "flex";
    weatherBody.style.display = "none";
    return;
  }

  locationNotFound.style.display = "none";
  weatherBody.style.display = "flex";

  temperature.innerHTML = `${Math.round(data.main.temp - 273.15)}<sup>°C</sup>`;
  description.innerHTML = data.weather[0].description;
  humidity.innerHTML = `${data.main.humidity}%`;
  windSpeed.innerHTML = `${Math.round(data.wind.speed * 3.6)} Km/H`;

  // Image Logic with Lowercase fix
  const condition = data.weather[0].main.toLowerCase();

  switch (condition) {
    case "clouds":
      weatherImg.src = "./assets/cloud.png";
      break;
    case "clear":
      weatherImg.src = "./assets/clear.png";
      break;
    case "rain":
      weatherImg.src = "./assets/rain.png";
      break;
    case "mist":
    case "haze":
    case "fog":
      weatherImg.src = "./assets/mist.png";
      break;
    case "snow":
      weatherImg.src = "./assets/snow.png";
      break;
    default:
      weatherImg.src = "./assets/cloud.png";
  }
}

// 2. Search by City Name
async function checkWeather(city) {
  if (city.trim() === "") return;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    updateUI(data);
  } catch (err) {
    console.error(err);
  }
}

// 3. Search by Location (Coordinates)
async function checkWeatherByCoords(lat, lon) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    updateUI(data);
  } catch (err) {
    console.error(err);
  }
}

// Event Listeners
searchBtn.addEventListener("click", () => checkWeather(inputBox.value));

inputBox.addEventListener("keyup", (e) => {
  if (e.key === "Enter") checkWeather(inputBox.value);
});

locationBtn.addEventListener("click", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((pos) => {
      checkWeatherByCoords(pos.coords.latitude, pos.coords.longitude);
    });
  } else {
    alert("Geolocation is not supported by your browser.");
  }
});
