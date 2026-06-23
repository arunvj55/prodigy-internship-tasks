const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('cityInput');
const weatherInfo = document.getElementById('weatherInfo');

// OpenWeatherMap standard free tier configuration key endpoint string
// Note: Replace this dummy key with your actual OpenWeatherMap API key if you want live operational results.
const apiKey = "4a1d8719b4ef3b29c0722e0e01476d0d"; 

searchBtn.addEventListener('click', getWeatherData);
cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') getWeatherData();
});

function getWeatherData() {
    const city = cityInput.value.trim();
    
    if (city === "") {
        weatherInfo.innerHTML = `<p class="msg" style="color: #e74c3c;">Please specify a valid city name location.</p>`;
        return;
    }

    weatherInfo.innerHTML = `<p class="msg">Fetching atmospheric telemetry metrics...</p>`;

    // Access target platform payload via standard client fetch queries 
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("City not encountered in system database.");
            }
            return response.json();
        })
        .then(data => {
            renderWeather(data);
        })
        .catch(err => {
            weatherInfo.innerHTML = `<p class="msg" style="color: #e74c3c;">${err.message}</p>`;
        });
}

function renderWeather(data) {
    // Extrapolate payload nodes accurately
    const name = data.name;
    const country = data.sys.country;
    const temp = Math.round(data.main.temp);
    const desc = data.weather[0].description;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;

    // Inject matching dynamic structural configuration strings into the UI
    weatherInfo.innerHTML = `
        <div class="cityName">${name}, ${country}</div>
        <div class="temp">${temp}°C</div>
        <div class="description">${desc}</div>
        <div class="details-grid">
            <div class="detail-item"><strong>Humidity:</strong> ${humidity}%</div>
            <div class="detail-item"><strong>Wind:</strong> ${windSpeed} m/s</div>
        </div>
    `;
}