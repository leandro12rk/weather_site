import React, { useState, useEffect } from "react";
import { useEnv } from "../context/EnvContext";
import Loading from "./Loading";
// import Swiper core and required modules
import { Navigation, Pagination, A11y, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { getDataWeek } from "../API/Api_Weather";
import { compareActualActiveDate } from "../utils/Functions";
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

        setTimeout(() => {
          setData(weatherData);
        }, 5000);
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
    return (
      <div className="container-weather-week">
        <Loading />
      </div>
    ); // Handle loading state or missing data
  }

  // Flatten the hours array to calculate the active slide index
  const dates = data.forecast.forecastday.flatMap((day) => day.date);
  //console.log("dates: " + dates);

  const activeIndex = dates.findIndex((forecastData) =>
    compareActualActiveDate(forecastData, data.location.localtime)
  );

  return (
    <div className="container-weather-week">
      <h3>Weather Week</h3>

      <SwiperSm activeIndex={activeIndex} data={data} />
      <SwiperLg activeIndex={activeIndex} data={data} />
    </div>
  );
}

function SwiperSm({ activeIndex, data }) {
  return (
    <Swiper
      // install Swiper modules
      className="swiper-sm"
      modules={[Navigation, Pagination, A11y]}
      spaceBetween={10}
      slidesPerView={3}
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
          slidesPerView: 3, // 3 slides visibles en pantallas grandes
          spaceBetween: 10,
        },
        1440: {
          slidesPerView: 3, // 4 slides visibles en pantallas muy grandes
          spaceBetween: 10,
        },
      }}
      initialSlide={activeIndex !== -1 ? activeIndex : 0} // Start at the active slide or the first slide
    >
      {data.forecast.forecastday.map((forecastData, index) => (
        <SwiperSlide>
          <div
            className={`container-weather-week-item ${
              compareActualActiveDate(
                forecastData.date,
                data.location.localtime
              )
                ? "active"
                : ""
            } `}
            key={index}>
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
  );
}
function SwiperLg({ activeIndex, data }) {
  return (
    <Swiper
      // install Swiper modules
      className="swiper-lg"
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      scrollbar={{ draggable: true }}
      spaceBetween={10}
      slidesPerView={3}
      direction="vertical"
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
          slidesPerView: 3, // 3 slides visibles en pantallas grandes
          spaceBetween: 10,
        },
        1440: {
          slidesPerView: 3, // 4 slides visibles en pantallas muy grandes
          spaceBetween: 10,
        },
      }}
      initialSlide={activeIndex !== -1 ? activeIndex : 0} // Start at the active slide or the first slide
    >
      {data.forecast.forecastday.map((forecastData, index) => (
        <SwiperSlide>
          <div
            className={`container-weather-week-item ${
              compareActualActiveDate(
                forecastData.date,
                data.location.localtime
              )
                ? "active"
                : ""
            } `}
            key={index}>
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
  );
}
