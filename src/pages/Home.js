import React from "react";

import ContainerWeatherActual from "../components/ContainerWeatherActual";
import ContainerWeatherDay from "../components/ContainerWeatherDay";
import ContainerWeatherTemperature from "../components/ContainerWeatherTemperature";
import ContainerWeatherWeek from "../components/ContainerWeatherWeek";
import SearchInput from "../components/SearchInput";

export default function Home() {
  return (
    <div id="Container-home">

        <div>
          <ContainerWeatherActual />
          <ContainerWeatherDay />
          <ContainerWeatherTemperature />
        </div>
        <ContainerWeatherWeek />

    </div>
  );
}
