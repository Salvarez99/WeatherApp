import React, { useState } from "react";
import axios from "axios";

export const Weather = () => {
  const [cityName, setCityName] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const getWeather = async () => {
    try {
      const response = await axios.get("http://localhost:8000/weather/", {
        params: { city: cityName },
      });
      setWeather(response.data);
      console.log(weather)
      setError(null);
    } catch (e) {
      setError("Error fetching weather data");
      setWeather(null);
    }
  };

  return (
    <div>
      {!weather ? (
        <div>
          <input
            type="text"
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
            placeholder="Enter city name"
          />
          <button onClick={getWeather}>Get Weather</button>
        </div>
      ) : (
        <div className="InfoContainer">
          <h2>Weather in {cityName}</h2>
          <p>
            <span>Condition:</span> {weather.description}
          </p>
          <p>
            <span>Temperature:</span> {weather.temperature}°F
          </p>
          <p>
            <span>Humidity:</span> {weather.humidity}%
          </p>
          <button
            className="ResetButton"
            onClick={() => {
              setWeather(null);
              setCityName("");
            }}
          >
            Search Again
          </button>
        </div>
      )}
      {error && <p className="Error">{error}</p>}
    </div>
  );
};
