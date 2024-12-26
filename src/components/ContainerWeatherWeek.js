//https://api.weatherapi.com/v1/forecast.json?key=dc61ec42f83f4bad92c163548241612&q=London&days=3

import React, { useState, useEffect } from "react";
import { useEnv } from "../context/EnvContext";

// import Swiper core and required modules
import { Navigation, Pagination, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { getDataWeek } from "../API/Api_Weather";
import { compareActualActiveTimeDate } from "../utils/Functions";
export default function ContainerWeatherWeek() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const { apiWeatherKey, apiWeatherUrl } = useEnv();
  const city = "London";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const weatherData = await getDataWeek(
          apiWeatherKey,
          apiWeatherUrl,
          city
        );
        setData(weatherData);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchData();
  }, [apiWeatherKey, apiWeatherUrl, city]);
  //console.log(data);

  if (error) {
    return <div className="container-weather-week">Error: {error}</div>;
  }

  if (!data || !data.forecast || !data.forecast.forecastday) {
    return <div className="container-weather-week">Loading...</div>; // Handle loading state or missing data
  }

  // Flatten the hours array to calculate the active slide index
  const hours = data.forecast.forecastday.flatMap((day) => day.hour);
  const activeIndex = hours.findIndex(
    (forecastData) =>
      compareActualActiveTimeDate(data.location.localtime, forecastData.time)

    //data.location.localtime === forecastData.time
  );
  console.info("hora actual " + data.location.localtime);

  return (
    <div className="container-weather-week">
      <h3>Weather Week</h3>

      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, A11y]}
        spaceBetween={10}
        slidesPerView={3}
       // direction="vertical" // Make the Swiper vertical
        breakpoints={{
          320: {
            slidesPerView: 2, // 1 slide visible en pantallas pequeñas
            spaceBetween: 5,
          },
          640: {
            slidesPerView: 4, // 2 slides visibles en pantallas medianas
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 4, // 3 slides visibles en pantallas grandes
            spaceBetween: 10,
          },
          1440: {
            slidesPerView: 4, // 4 slides visibles en pantallas muy grandes
            spaceBetween: 20,
          },
        }}
        //navigation
        //pagination={{ clickable: true }}
        initialSlide={activeIndex !== -1 ? activeIndex : 0} // Start at the active slide or the first slide
      >
        {data.forecast.forecastday.map((forecastData, index) => (
          <SwiperSlide>
            <div className="container-weather-week-item" key={index}>
              {forecastData.date}
              <span className="container-icon">
                <span>
                  <img
                    src={forecastData.day.condition.icon}
                    className="img-fluid"
                    alt={forecastData.day.condition.text}
                  />
                </span>
                <span>{forecastData.day.condition.text}</span>
              </span>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
