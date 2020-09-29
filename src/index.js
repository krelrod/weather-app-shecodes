function displayTemp(response) {
  console.log(response.data.main.temp);
  let temperatureElement = document.querySelector("#full-temp");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
}
let apiKey = "1a11d8dac18dce724ebbebc6a9526d87";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Decatur&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayTemp);

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
