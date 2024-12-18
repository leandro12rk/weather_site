import React, { createContext, useState, useEffect } from "react";

// Crear el contexto
export const SearchContext = createContext();

// Crear un proveedor de contexto
export const SearchProvider = ({ children }) => {
  const [location, setLocation] = useState(() => {
    const storedLocation = localStorage.getItem("location");
    return storedLocation || "es";
  });

  useEffect(() => {
    localStorage.setItem("location", location);
  }, [location]);

  const toggleLocation = () => {
    setLocation((prevLocation) => (prevLocation === "es" ? "en" : "es"));
  };

  return (
    <SearchContext.Provider value={{ location, toggleLocation }}>
      {children}
    </SearchContext.Provider>
  );
};


