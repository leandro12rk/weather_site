
export async function getAllDataWeather(apiWeatherKey, apiWeatherUrl,city) {

  const response = await fetch(
    `${apiWeatherUrl}forecast.json?key=${apiWeatherKey}&q=${city}&days=1&aqi=yes&alerts=no`
  );
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
}
