import React, { useState, useEffect } from "react";
import { useEnv } from "../context/EnvContext";

export default function ContainerWeatherActual() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const { apiWeatherKey, apiWeatherUrl } = useEnv();
  const city = "London";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${apiWeatherUrl}current.json?key=${apiWeatherKey}&q=${city}&aqi=no`
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
    return <div>Error: {error}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container-weather-actual">
      <span>
        <h1>Weather in {data.location.name}</h1>
        <p>{data.location.region}</p>
      </span>
      <span>
        <p>Temperature: {data.current.temp_c}°C</p>
        <span>
          <img
            src={data.current.condition.icon}
            className="img-fluid"
            alt={data.current.condition.text}
          />
          <br />
          {data.current.condition.text}
        </span>
      </span>
    </div>
  );
}
