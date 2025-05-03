const weatherData = {
  London: { temp: "15°C", humidity: "70%", conditions: "Cloudy" },
  Paris: { temp: "18°C", humidity: "65%", conditions: "Sunny" },
  Tokyo: { temp: "22°C", humidity: "80%", conditions: "Rainy" },
};

function fetchWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const resultDiv = document.getElementById("weatherResult");

  setTimeout(() => {
    if (weatherData[city]) {
      const data = weatherData[city];
      resultDiv.innerHTML = `
        <h3>${city}</h3>
        <p>Temperature: ${data.temp}</p>
        <p>Humidity: ${data.humidity}</p>
        <p>Conditions: ${data.conditions}</p>
      `;
    } else {
      resultDiv.innerHTML = `<p>Weather data for ${city} not found.</p>`;
    }
  }, 500);
}
