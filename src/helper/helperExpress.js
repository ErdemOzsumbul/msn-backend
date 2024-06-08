const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const App = () => {
  const app = express();
  const port = process.env.PORT || 5000;
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cors());
  app.listen(port, err => {
    if (err) {
      console.error(err);
    }
    console.info("Server is running on port " + port);
  });
  app.get("/", (req, res) => {
    res.send("Erdem Özsümbül");
  });
  return app;
};

module.exports = App;
