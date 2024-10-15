function displayTemperature(response) {
  let temperatureElement = document.querySelector(".temperature-container");
  let temperature = Math.round(response.data.temperature.current);
  let cityElement = document.querySelector(".current-city");
  cityElement.innerHTML = response.data.city;
  let iconElement = document.querySelector(".current-temperature-icon img");
  let iconCode = response.data.condition.icon;
  temperatureElement.innerHTML = ` ${iconCode} ${temperature}°C`;

  iconElement.setAttribute("src", iconCode);
  iconElement.setAttribute("alt", response.data.condition.list);
}

function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  let city = searchInputElement.value.trim();
  let apiKey = "d6116e815a6e6a387bt2b0af2o2c3495";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios
    .get(apiUrl)
    .then(displayTemperature)
    .catch((error) => console.error(error));

  let h1 = document.querySelector("h1");
  h1.innerHTML = `${city}`;
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let currentDateELement = document.querySelector("#current-date");
let currentDate = new Date();

currentDateELement.innerHTML = formatDate(currentDate);
