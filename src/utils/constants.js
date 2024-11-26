export const apiKey = "da94db84bae8b12a9d3d159ace780c98";
export const location = {
  latitude: "41.651031",
  longitude: "-83.541939",
};

export const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://api.projectreact.twilightparadox.com"
    : "http://localhost:3001";

export function checkResponse(res) {
  if (res.ok) {
    return res.json();
  } else return Promise.reject(`Error: ${res.status}`);
}

export function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

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
