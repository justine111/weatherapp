// Define an object 'api' that holds the API key and base URL for the OpenWeatherMap API.
const api = {
  key: "baedc2f2f31b7b3303e5d42d88d283c3",
  base: "https://api.openweathermap.org/data/2.5/",
};

// Get the search box element and add an event listener for keypress events.
const searchbox = document.querySelector(".search-box");
searchbox.addEventListener("keypress", setQuery);

// This function is called when a key is pressed in the search box.
function setQuery(evt) {
  // Check if the key pressed is Enter (key code 13).
  if (evt.keyCode == 13) {
    // Call the 'getResults' function with the value in the search box as the query.
    getResults(searchbox.value);
  }
}

// This function makes a request to the OpenWeatherMap API and fetches weather data based on the query.
function getResults(query) {
  // Use the fetch API to make a GET request to the OpenWeatherMap API.
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then((weather) => {
      // Parse the response as JSON and pass it to the 'displayResults' function.
      return weather.json();
    })
    .then(displayResults);
}

// This function displays the weather data on the web page.
function displayResults(weather) {
  // Get elements on the page to display weather information.
  let city = document.querySelector(".location .city");
  // Set the city name and country based on the weather data.
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector(".location .date");
  // Build and set the current date using the 'dateBuilder' function.
  date.innerText = dateBuilder(now);

  let temp = document.querySelector(".current .temp");
  // Set the temperature in Celsius with a degree symbol.
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

  let weather_el = document.querySelector(".current .weather");
  // Display the main weather condition (e.g., "Clear," "Clouds") from the weather data.
  weather_el.innerText = weather.weather[0].main;

  let hilow = document.querySelector(".hi-low");
  // Display the temperature range (min and max) for the day.
  hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(
    weather.main.temp_max
  )}°c`;

  // Call the setBackground function to change the background image based on weather condition
  setBackground(weather);
}

function setBackground(weather) {
  const body = document.body; // or select the container element you want to apply the background to

  // Define an object that maps weather conditions to CSS class names.
  const backgroundClasses = {
    Clear: "clear-background",
    Clouds: "cloudy-background",
    Rain: "rainy-background",
    Snow: "snow-background",
    // Add more weather conditions and their corresponding class names as needed.
  };

  // Remove any previously set background classes.
  for (const key in backgroundClasses) {
    body.classList.remove(backgroundClasses[key]);
  }

  // Log the weather condition to check if it's correctly matched.
  console.log("Weather condition:", weather.weather[0].main);

  // Check if the current weather condition is in the backgroundClasses object.
  if (backgroundClasses[weather.weather[0].main]) {
    const appliedClass = backgroundClasses[weather.weather[0].main];
    console.log("Applied class:", appliedClass);
    body.classList.add(appliedClass);
  } else {
    // Default background class if the condition is not found.
    console.log("Default class applied");
    body.classList.add("default-background");
    
  }
}

// This function builds and returns a formatted date string.
function dateBuilder(d) {
  let months = [
    "January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"
  ];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}
