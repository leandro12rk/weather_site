import React from "react";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";

import { useEnv } from "./context/EnvContext";


function App() {

  const { apiWeatherKey, apiBaseUrl } = useEnv();
  console.log(apiWeatherKey)
  return (
    <div className="App">
      <div className="body-container">
        <NavBar/>
        <Home/>
      </div>
    </div>
  );
}

export default App;
