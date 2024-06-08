const axios = require("axios");
module.exports = async (req, res) => {
  const APIkey = process.env.WEATHER_API_KEY;
  try {
    const weather = await axios.get(
      `http://api.openweathermap.org/geo/1.0/direct?q=Izmir&limit=5&appid=${APIkey}`
    );
    const trWeather = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?lat=${weather.data[0].lat}&lon=${weather.data[0].lon}&units=metric&lang=en&appid=${APIkey}`
    );
    const enWeather = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?lat=${weather.data[0].lat}&lon=${weather.data[0].lon}&units=metric&lang=tr&appid=${APIkey}`
    );
    const combined = {
      city: weather.data[0].name,
      tr: trWeather.data["weather"][0].description,
      en: enWeather.data["weather"][0].description,
      temp: trWeather.data.main.temp,
      icon: trWeather.data.weather[0].icon,
      all: trWeather.data,
    };
    res.json(combined).status(200);
  } catch (error) {
    console.error(error.message);
    res.status(400).send("Bad Request");
  }
};
