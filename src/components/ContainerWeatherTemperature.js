import React, { useState, useEffect } from "react";
import { useEnv } from "../context/EnvContext";
import { getAllDataWeather } from "../API/Api_Weather";
import AirIcon from "@mui/icons-material/Air";
import Loading from "./Loading";
export default function ContainerWeatherTemperature() {
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

        setTimeout(() => {
          setData(result);
        }, 5000);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, [apiWeatherKey, apiWeatherUrl, city]);

  if (error) {
    return <div className="container-weather-temperature">Error: {error}</div>;
  }

  if (!data) {
    return (
      <div className="container-weather-temperature">
        <Loading />
      </div>
    );
  }
  return (
    <div className="container-weather-temperature">
      <span>
        <p> Wind: </p>
        {data.current.wind_kph} km/h from SSW <AirIcon />
      </span>
      <span>
        <p>Humidity:</p> {data.current.humidity} %
      </span>
      <span>
        <p>Precipitation:</p> {data.current.precip_mm} mm
      </span>
      <span>
        <p>Pressure:</p> {data.current.pressure_mb} mb (
        {data.current.wind_degree} °)
      </span>
    </div>
  );
}
