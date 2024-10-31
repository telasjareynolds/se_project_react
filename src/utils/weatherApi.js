import {
  defaultClothingItems,
  apiKey,
  location,
  getWeatherType,
} from "./constants";
import { checkResponse } from "./api";

export function weather() {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&units=imperial&appid=${apiKey}`
  ).then(checkResponse)
}

export function filterWeatherData(data) {
  const weather = {};
  weather.city = data.name;
  weather.main = {
    F: Math.round(data.main.temp),
    C: Math.round(((data.main.temp - 32) * 5) / 9),
  };
  weather.type = getWeatherType(weather.main.F);
  return weather;
}
