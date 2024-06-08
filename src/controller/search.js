const mongoose = require("mongoose");
const newsSchema = require("../schema/news");

module.exports = async (req, res) => {
  const { query } = req.query;
  try {
    if (!query) res.status(400).send("Bad Request");

    const data = await newsSchema.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
      ],
    });

    res.send(data);
  } catch (error) {
    res.status(400).send("Bad Request");
  }
};
