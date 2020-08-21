/* Global Variables */

let baseURL = "http://api.openweathermap.org/data/2.5/weather?zip=";

// Personal API Key for OpenWeatherMap API

let apiKey = "&appid=de353aed82a85bb030471e4b3a1c365e";

// Create a new date instance dynamically with JS

let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

// Event listener to add function to existing HTML DOM element

document.getElementById("generate").addEventListener("click", performAction);

/* Function called by event listener */

function performAction(e) {
  const newZip = document.getElementById("zip").value;
  const feelings = document.getElementById("feelings").value;
  getWeather(newZip, apiKey);
}

/* Function to GET Web API Data*/
/* Function to POST data */
/* Function to GET Project Data */

const getWeather = async (newZip, apiKey) => {
  const res = fetch(`${baseURL}${newZip}${apiKey}`)
    .then((response) => response.json())
    .then((data) => {
      const tempKel = data.main.temp;
      return postWeather("/addWeather", {
        date: newDate,
        temp: tempKel,
        feelings: feelings,
      });
    })
    .then(() => fetch("/all"))
    .then((response) => response.json())
    .then((allData) => {
      const data = allData[allData.length - 1];
      document.getElementById("date").innerHTML = data.date;
      document.getElementById("temp").innerHTML = formatTemperature(data.temp);
      document.getElementById("content").innerHTML = data.feelings;
    });
};

function formatTemperature(tempKel) {
  const celcius = tempKelvin - 273.15;
  const fahrenheit = celcius * (9 / 5) + 32;
  return `${celcius.toFixed(0)} C/${fahrenheit.toFixed(1)} F`;
}

function postWeather(url = "", data = {}) {
  return fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}
