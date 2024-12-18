import React from "react";

import ContainerWeatherActual from "../components/ContainerWeatherActual";
import ContainerWeatherDay from "../components/ContainerWeatherDay";
import ContainerWeatherTemperature from "../components/ContainerWeatherTemperature";
import ContainerWeatherWeek from "../components/ContainerWeatherWeek";

export default function Home() {
  return (
    <div id="Container-home">
      <div>
        <ContainerWeatherActual />
        <ContainerWeatherDay />
      </div>
        <ContainerWeatherTemperature />
      <ContainerWeatherWeek />
    </div>
  );
}
