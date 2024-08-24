import React from "react";
import './App.css';
import { Weather } from "./components/Weather";

function App() {
  return (
    <div className={"App"}>
      <div className="Title">
        <h1>Weather App</h1>
      </div>
      <div className="Search">
        <Weather/>
      </div>
    </div>
  );
}

export default App;
