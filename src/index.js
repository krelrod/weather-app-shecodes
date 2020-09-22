//current time and date

function currentTime() {
  let time = new Date();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let currentMonth = months[time.getMonth()];
  let currentDay = days[time.getDay()];
  let currentDate = time.getDate();
  let currentYear = time.getFullYear();
  let currentHour = time.getHours();
  let currentMinutes = time.getMinutes();

  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }

  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }

  return `${currentDay}, ${currentMonth} ${currentDate}, ${currentYear} | ${currentHour}:${currentMinutes}`;
}

let timeShown = document.querySelector("#full-date");
let fullTimeShown = document.querySelector("#current-time");
timeShown.innerHTML = currentTime();
fullTimeShown.innerHTML = currentTime();

//to celsius or fahrenheit buttons

function toCelsius(event) {
  event.preventDefault();
  let arbitraryTemp = 75;
  let degreesC = Math.round(((arbitraryTemp - 32) * 5) / 9);

  let tempDisplayed = document.querySelector("#current-temp");
  tempDisplayed.innerHTML = degreesC;
}

function toFahrenheit(event) {
  event.preventDefault();
  let arbitraryTemp2 = 31;
  let degreesF = Math.round((arbitraryTemp2 * 9) / 5 + 32);

  let tempDisplayed = document.querySelector("#current-temp");
  tempDisplayed.innerHTML = degreesF;
}

let tempCelsius = document.querySelector("#to-celsius");
let tempFahrenheit = document.querySelector("#to-fahrenheit");
tempCelsius.addEventListener("click", toCelsius);
tempFahrenheit.addEventListener("click", toFahrenheit);

// search button

function displayWeather(response) {
  let currentButtonCity = response.data.name;
  let currentButtonCountry = response.data.sys.country;
  let currentWindspeed = Math.round(response.data.wind.speed);
  let currentFullTemp = Math.round(response.data.main.temp);
  let currentHumidity = response.data.main.humidity;
  document.querySelector(
    "#large-current-city"
  ).innerHTML = `${currentButtonCity}, ${currentButtonCountry}`;
  document.querySelector("#full-temp").innerHTML = `${currentFullTemp}°C`;
  document.querySelector(
    "#humidity"
  ).innerHTML = `${currentHumidity}% // humidity`;
  document.querySelector(
    "#windspeed"
  ).innerHTML = `${currentWindspeed}kph // windspeed`;
}
function searchCity(city) {
  let apiKey = "1a11d8dac18dce724ebbebc6a9526d87";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}
function submitSearch(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

let searchBar = document.querySelector("#search-form");
searchBar.addEventListener("submit", submitSearch);
searchCity("Decatur, USA");

//Current location + weather button
function showWeather(response) {
  let currentButtonCity = response.data.name;
  let currentButtonCountry = response.data.sys.country;
  let currentWindspeed = Math.round(response.data.wind.speed);
  let currentFullTemp = Math.round(response.data.main.temp);
  let currentHumidity = response.data.main.humidity;
  document.querySelector(
    "#large-current-city"
  ).innerHTML = `${currentButtonCity}, ${currentButtonCountry}`;
  document.querySelector("#full-temp").innerHTML = `${currentFullTemp}°C`;
  document.querySelector(
    "#humidity"
  ).innerHTML = `${currentHumidity}% // humidity`;
  document.querySelector(
    "#windspeed"
  ).innerHTML = `${currentWindspeed}kph // windspeed`;
}
function retrievePosition(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}
function geoLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}
let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", geoLocation);
