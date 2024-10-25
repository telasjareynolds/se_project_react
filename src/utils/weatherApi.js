import { defaultClothingItems, apiKey, location, getWeatherType } from "./constants";

export function weather() {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&units=imperial&appid=${apiKey}`
  ).then((res) => {
    if (res.ok) {
      return res.json();
    }
    Promise.reject(`Error ${res.status}`);
  });
}

export function filterWeatherData (data) {
  const weather = {};
    weather.city = data.name;
    weather.main = { F: data.main.temp };
    weather.type = getWeatherType(weather.main.F);
  return weather;
}

