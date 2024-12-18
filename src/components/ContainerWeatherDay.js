import React, { useState, useEffect } from "react";
import { useEnv } from "../context/EnvContext";

// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// // Import Swiper styles
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import 'swiper/css/scrollbar';

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
      <h3>Weather Day</h3>
      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={50}
        slidesPerView={3}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log("slide change")}>
        {data.forecast.forecastday.map((day) =>
          day.hour.map((forecastData, index) => (
            <SwiperSlide>
              <div key={index} className="hourly-forecast">
                <span>Time:  {forecastData.time}</span>
                <span>Temp:  {forecastData.temp_c}°C</span>
                <span className="container-icon">
                  <span>
                    <img
                      src={forecastData.condition.icon}
                      className="img-fluid"
                      alt={forecastData.condition.text}
                    />
                  </span>
                  <span>{forecastData.condition.text}</span>
                </span>
              </div>
            </SwiperSlide>
          ))
        )}
      </Swiper>
    </div>
  );
}
