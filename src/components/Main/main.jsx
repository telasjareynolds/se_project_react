import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard.jsx";
import { defaultClothingItems } from "../../utils/constants.js";
import ItemCard from "../ItemCard/ItemCard.jsx";

function Main({ weatherData, openPreviewImageModal }) {
  //hot, warm, or cold

  return (
    <main>
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__heading">
          Today is {weatherData.main.F}&deg;F / You may want to wear:
        </p>
        <ul className="cards__list">
          {defaultClothingItems
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
