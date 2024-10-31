import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard.jsx";
import ItemCard from "../ItemCard/ItemCard.jsx";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext.js";
import React from "react";

function Main({ weatherData, openPreviewImageModal, clothingItems }) {
  //hot, warm, or cold
  const { currentTemperatureUnit } = React.useContext(
    CurrentTemperatureUnitContext
  );

  return (
    <main>
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__heading">
          Today is {weatherData.main[currentTemperatureUnit]}&deg;
          {currentTemperatureUnit === "F" ? "F" : "C"} / You may want to wear:
        </p>
        <ul className="cards__list">
          {clothingItems
            .filter((item) => {
              return item.weather === weatherData.type;
            })
            .map((item) => {
              return (
                <ItemCard
                  key={item._id}
                  item={item}
                  openPreviewImageModal={openPreviewImageModal}
                />
              );
            })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
