export const weatherOptions = [
  {
    day: true,
    condition: "clear",
    url: new URL("../assets/day/clear.png", import.meta.url).href,
  },
  {
    day: true,
    condition: "clear",
    url: new URL("../assets/day/cloudy.png", import.meta.url).href,
  },
  {
    day: false,
    condition: "cloudy",
    url: new URL("../assets/night/clear.png", import.meta.url).href,
  },
  {
    day: false,
    condition: "cloudy",
    url: new URL("../assets/night/cloudy.png", import.meta.url).href,
  },
];

export const defaultWeatherOptions = {
  day: {
    url: new URL("../assets/day/default.png", import.meta.url).href,
  },
  night: {
    url: new URL("../assets/night/default.png", import.meta.url).href,
  },
};

export const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://api.wtwr-demonstration.chickenkiller.com"
    : "http://localhost:3001";

export const APIkey = "4ede77c89971b72d70d995d0220cdd12";
export const coordinates = {
  latitude: 40.849781,
  longitude: -73.868858,
};
