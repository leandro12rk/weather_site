import React, { useState, useEffect } from "react";
import { useEnv } from "../context/EnvContext";

export default function ContainerWeatherDay() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const { apiWeatherKey, apiWeatherUrl } = useEnv();
  const city = "London";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${apiWeatherUrl}forecast.json?key=${apiWeatherKey}&q=${city}&days=1&aqi=yes&alerts=no`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, [apiWeatherKey, apiWeatherUrl, city]);

  if (error) {
    return <div className="container-weather-day">Error: {error}</div>;
  }

  if (!data || !data.forecast || !data.forecast.forecastday) {
    return <div className="container-weather-day">Loading...</div>; // Handle loading state or missing data
  }

  return (
    <div className="container-weather-day">
      {data.forecast.forecastday.map((day) =>
        day.hour.map((forecastData, index) => (
          <div key={index} className="hourly-forecast">
            <span>{forecastData.time}</span>
            <br />
            <span>{forecastData.temp_c}°C</span>
            <span>
              <img
                src={forecastData.condition.icon}
                className="img-fluid"
                alt={forecastData.condition.text}
              />
              <span>{forecastData.condition.text}</span>
            </span>
          </div>
        ))
      )}
    </div>
  );
}
