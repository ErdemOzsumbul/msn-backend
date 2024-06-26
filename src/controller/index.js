const news = require("./news");
const login = require("./login");
const register = require("./register");
const googleLogin = require("./googleLogin");
const search = require("./search");
const details = require("./details");
const notification = require("./notification");
const weather = require("./weather");

const Controller = (app) => {
  app.get("/api/news", news);
  app.get("/api/filter/all", search);
  app.get("/api/details", details);

  app.post("/api/auth/register", register);
  app.post("/api/auth/login", login);
  app.post("/api/auth/googlelogin", googleLogin);

  app.get("/api/notification", notification);

  app.get("/api/weather", weather);

  // app.post("/api/multiple/addNews", async (req, res) => {
  //   const { news } = req.body;
  //   try {
  //     await newsSchema.insertMany(news);
  //     res.send("news added").status(200);
  //   } catch (error) {
  //     console.error(error.message);
  //     res.status(400).send("Bad Request");
  //   }
  // });

  // app.delete("/api/news/delete/all", async (req, res) => {
  //   try {
  //     await newsSchema.deleteMany({});
  //     res.send("All news deleted").status(200);
  //   } catch (error) {
  //     console.error(error.message);
  //     res.status(400).send("Bad Request");
  //   }
  // });

  // app.delete("/api/auth/del/all", async (req, res) => {
  //   try {
  //     await userSchema.deleteMany({});
  //     console.log("All users deleted");
  //     res.send("User deleted").status(200);
  //   } catch (error) {
  //     console.error(error.message);
  //     res.status(400).send("Bad Request");
  //   }
  // });
};

module.exports = Controller;
