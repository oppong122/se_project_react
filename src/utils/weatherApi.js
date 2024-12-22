export const getWeather = ({ latitude, longitude }, APIkey) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`
  ).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Error: ${res.status}`);
    }
  });
};

// function tempConvertor(temp, type) {}

export const filterWeatherData = (data) => {
  const result = {};
  result.city = data.name;
  result.temp = { F: data.main.temp };
  result.type = getWeatherType(result.temp.F);
  // const weather = {
  //   temp: {
  //     F: Math.round(temp),
  //     C: Math.round(((data.main.temp - 32) * 5) / 9),
  //   },
  // };
  // console.log(weather);
  result.conditon = data.weather[0].main.toLowerCase;
  result.weather = result.isDay = isDay(data.sys, Date.now);

  return result;
};

const isDay = ({ sunrise, sunset }, now) => {
  // const now = Date.now();
  // converting sunrise and sunset from seconds to milliseconds by multplying by 1000
  return sunrise * 1000 < now && now > sunset * 1000;
};

const getWeatherType = (temperature) => {
  if (temperature > 86) {
    return "hot";
  } else if (temperature >= 66 && temperature < 86) {
    return "warm";
  } else {
    return "cold";
  }
};

// export default getWeather;
