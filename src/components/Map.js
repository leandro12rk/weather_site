import React from "react";
import { useEnv } from "../context/EnvContext";

export default function Map({ longitude, latitude }) {
  const { apiMapKey } = useEnv();
  return (
    <div className="container-map">
      <iframe
      className="map"
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        src={`https://www.google.com/maps/embed/v1/place?key=${apiMapKey}&q=${latitude},${longitude}`}></iframe>
    </div>
  );
}
