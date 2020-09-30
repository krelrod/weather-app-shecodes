function displayTemp(response) {
  console.log(response.data.main.temp);
  let temperatureElement = document.querySelector("#full-temp");
  let cityElement = document.querySelector("#city-name");
  let countryElement = document.querySelector("#country-name");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windspeedElement = document.querySelector("#windspeed");
  let conditionIconElement = document.querySelector("#condition-icon");
  conditionIconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  celsiusTemperature = response.data.main.temp;
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  countryElement.innerHTML = response.data.sys.country;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windspeedElement.innerHTML = Math.round(response.data.wind.speed);
  console.log(response.data);
}
function search(city) {
  let apiKey = "1a11d8dac18dce724ebbebc6a9526d87";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemp);
}
function submitSearch(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  console.log(cityInputElement.value);
  search(cityInputElement.value);
}

function showFahrenheitTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#full-temp");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemp = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemp);
}
function showcelsiusTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#full-temp");
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#to-fahrenheit");
fahrenheitLink.addEventListener("click", showFahrenheitTemp);

let celsiusLink = document.querySelector("#to-celsius");
celsiusLink.addEventListener("click", showcelsiusTemp);

search("Decatur");

let form = document.querySelector("#search-form");
form.addEventListener("submit", submitSearch);

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

let fullTimeShown = document.querySelector("#current-time");
fullTimeShown.innerHTML = currentTime();

function retrievePosition(position) {
  let apiKey = "1a11d8dac18dce724ebbebc6a9526d87";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
  axios.get(url).then(displayTemp);
}
function geoLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}
let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", geoLocation);
