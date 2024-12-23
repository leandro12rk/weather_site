import React from "react";
import { useEnv } from "../context/EnvContext";

export default function Map({ longitude, latitude }) { 
  const { apiMapKey } = useEnv();
  return (
    <div>
      <iframe
        width="250"
        height="250"
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        src={`https://www.google.com/maps/embed/v1/place?key=${apiMapKey}&q=${latitude},${longitude}`}></iframe>
    </div>
  );
}