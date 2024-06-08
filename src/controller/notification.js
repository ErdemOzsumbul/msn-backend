const newsSchema = require("../schema/news");

module.exports = async (req, res) => {
  const { email } = req.query;
  try {
    const lastNews = await newsSchema.find().sort({ timestamp: -1 }).limit(3);
    res.send(lastNews).status(200);
  } catch (error) {
    console.error(error.message);
    res.status(400).send("Bad Request");
  }
};
