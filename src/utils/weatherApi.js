import { defaultClothingItems, apiKey, location } from "./constants"

export function weather() {
  return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&units=imperial&appid=${apiKey}`)
  .then((res) => {
    return res.json()
  })
  Promise.reject(`promise rejected`);
}

