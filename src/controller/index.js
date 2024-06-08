const mongoose = require("mongoose");
const newsSchema = require("../schema/news");
const { OAuth2Client } = require("google-auth-library");
const crypto = require("crypto");
const axios = require("axios");

const news = require("./news");
const newsData = require("../../news.json");
const userSchema = require("../schema/users");
const login = require("./login");
const register = require("./register");
const googleLogin = require("./googleLogin");
const search = require("./search");
const details = require("./details");
const notification = require("./notification");

const Controller = app => {
  app.get("/api/news", news);
  app.get("/api/filter/all", search);
  app.get("/api/details", details);

  app.post("/api/auth/register", register);
  app.post("/api/auth/login", login);
  app.post("/api/auth/googlelogin", googleLogin);

  app.get("/api/notification", notification);

  app.post("/api/multiple/addNews", async (req, res) => {
    const { news } = req.body;
    try {
      await newsSchema.insertMany(news);
      res.send("news added").status(200);
    } catch (error) {
      console.error(error.message);
      res.status(400).send("Bad Request");
    }
  });

  app.delete("/api/news/delete/all", async (req, res) => {
    try {
      await newsSchema.deleteMany({});
      res.send("All news deleted").status(200);
    } catch (error) {
      console.error(error.message);
      res.status(400).send("Bad Request");
    }
  });

  app.get("/api/auth/del/all", async (req, res) => {
    try {
      await userSchema.deleteMany({});
      console.log("All users deleted");
      res.send("User deleted").status(200);
    } catch (error) {
      console.error(error.message);
      res.status(400).send("Bad Request");
    }
  });

  app.get("/api/weather", async (req, res) => {
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
  });
};

module.exports = Controller;
