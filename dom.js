
// // fetch(`https://api.openweathermap.org/data/2.5/weather?q=&appid=`) 
//     .then(response => response.json())
//     .then(data => console.log(data))
//     .catch(error => console.error(error));


console.log('Whats the weather like today')
const searchForm = document.getElementById('city-search');
const weatherInput = document.getElementById('city-input');
const cityNameDisplay = document.getElementById('city');
const highDetails = document.getElementById('high');
const lowDetails = document.getElementById('low');
const forecastDetails = document.getElementById('forecast');
const humidDetails = document.getElementById('humidity');


const displayError = (message) => {
    const errorElement = document.createElement('div');
    errorElement.classList.add('error-message');
    errorElement.textContent = message;
    document.body.appendChild(errorElement);
};
const kelvinToFahrenheit = (kelvin) => {
    return (kelvin - 273.15) * 9/5 + 32;
};
const fetchWeather = async (cityname) => {
    try {
        const apiKey = '9e463490c4da5b954ac4906879d73af9';
        const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
        const response = await fetch(apiURL);
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        displayError("Location doesn't exist, or is misspelled. Please try again.");
    }
 }

 const displayWeather = (data) => {
    const { name } = data;
    const { temp_max, temp_min, humidity } = data.main;
    const { main } = data.weather[0];
    
    const tempMaxFahrenheit = kelvinToFahrenheit(temp_max);
    const tempMinFahrenheit = kelvinToFahrenheit(temp_min);

    cityNameDisplay.textContent =`The weather in ${name}`;
    highDetails.textContent = `The High today is ${tempMaxFahrenheit.toFixed(2)}`;
    lowDetails.textContent = `The Low today is ${tempMinFahrenheit.toFixed(2)}`;
    forecastDetails.textContent = `Today's Forecast is ${main}`;
    humidDetails.textContent = `Today's Humidity is ${humidity}%`;

    setBackGroundImage(main); 
 };
 searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const cityName = weatherInput.value.trim().toLowerCase();
    if (cityName) {
        fetchWeather(cityName);
    } else {
        displayError('Please enter a city.');
    }
});


