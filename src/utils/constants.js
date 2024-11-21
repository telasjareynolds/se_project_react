export const apiKey = "da94db84bae8b12a9d3d159ace780c98";
export const location = {
  latitude: "41.651031",
  longitude: "-83.541939",
};

export function getWeatherType(temp) {
  if (temp >= 86) {
    return "hot";
  } else if (temp >= 66) {
    return "warm";
  } else {
    return "cold";
  }
}

export const currentDate = new Date().toLocaleString("default", {
  month: "long",
  day: "numeric",
});
