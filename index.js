const API_KEY = "d1845658f92b31c64bd94f06f7188c9c";

function renderWeatherInfo(data, elementId) {
    let weatherInfo = document.getElementById(elementId);
    weatherInfo.innerHTML = '';  // Clear previous content
    let newPara = document.createElement('p');
    newPara.textContent = `${data?.main?.temp.toFixed(2)} °C`;
    weatherInfo.appendChild(newPara);
}

async function fetchWeatherDetails() {
    try {
        let city = "paris";  
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
        const data = await response.json();
        console.log("Weather data for Paris: ", data);
        renderWeatherInfo(data, 'weatherInfoParis');
    } catch(err) {
        console.error("Error fetching weather details", err);
    }
}

async function fetchWeatherDetailsforgoa(){
    try {
        let city = "goa";
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
        const data = await response.json();
        console.log("Weather data for Goa: ", data);
        renderWeatherInfo(data, 'weatherInfoGoa');
    } catch(err) {
        console.error("Error fetching weather details", err);
    }
}

async function getCustomWeatherDetails() {
    try {
        let latitude = 17.6333;
        let longitude = 18.3333;
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`);
        const data = await response.json();
        console.log("Custom weather data: ", data);
        renderWeatherInfo(data, 'weatherInfoCustom');
    } catch(err) {
        console.error("Error fetching custom weather details", err);
    }
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        console.log("No geolocation support.");
    }
}

function showPosition(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    console.log("Latitude: ", lat, "Longitude: ", lon);
    fetchWeatherByLocation(lat, lon);
}

async function fetchWeatherByLocation(lat, lon) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
        const data = await response.json();
        console.log("Location weather data: ", data);
        renderWeatherInfo(data, 'weatherInfoLocation');
    } catch(err) {
        console.error("Error fetching weather by location", err);
    }
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            console.log("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            console.log("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            console.log("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            console.log("An unknown error occurred.");
            break;
    }
}
