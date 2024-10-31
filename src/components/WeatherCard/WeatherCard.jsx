import "./WeatherCard.css";
import cloudy from "../../assets/cloudy.png";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import React from "react";

function WeatherCard({ weatherData }) {
  const { currentTemperatureUnit } = React.useContext(
    CurrentTemperatureUnitContext
  );
  return (
    <section className="weather-card">
      <p className="weather-card__temp">
        {weatherData.main[currentTemperatureUnit]}&deg;
        {currentTemperatureUnit}
      </p>
      <img src={cloudy} alt="cloudy" className="weather-card__img" />
    </section>
  );
}

export default WeatherCard;
