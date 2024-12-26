
export async function getAllDataWeather(apiWeatherKey, apiWeatherUrl,city) {

  const response = await fetch(
    `${apiWeatherUrl}forecast.json?key=${apiWeatherKey}&q=${city}&days=1&aqi=yes&alerts=no`
  );
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
}

export async function getDataWeek(apiWeatherKey, apiWeatherUrl,city) {

//https://api.weatherapi.com/v1/forecast.json?key=dc61ec42f83f4bad92c163548241612&q=London&days=3

  const response = await fetch(
    `${apiWeatherUrl}forecast.json?key=${apiWeatherKey}&q=${city}&days=7`
  );
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
}
