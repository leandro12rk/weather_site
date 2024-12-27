import React, { useState, useEffect } from "react";
import { useEnv } from "../context/EnvContext";
import Loading from "./Loading";
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
    return <div className="container-weather-actual">Error: {error}</div>;
  }

  if (!data) {
    return (
      <div className="container-weather-actual">
        <Loading />
      </div>
    );
  }

  return (
    <div className="container-weather-actual">
      <span className="container-text">
        <h1> {data.location.name}</h1>
        <p>{data.location.region}</p>
        <p> {data.location.localtime}</p>
      </span>
      <span className="container-icon">
        <span>{data.current.condition.text}</span>
        <span>
          <img
            src={data.current.condition.icon}
            className=""
            alt={data.current.condition.text}
          />
        </span>
        <span>Temperature: {data.current.temp_c}°C</span>
      </span>
    </div>
  );
}
