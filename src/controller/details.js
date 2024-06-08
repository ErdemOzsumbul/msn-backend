const mongoose = require("mongoose");
const newsSchema = require("../schema/news");

module.exports = async (req, res) => {
  const { id } = req.query;
  if (!id) {
    res.status(400).send("Bad Request");
  }
  console.log(id);
  try {
    const data = await newsSchema.findOne({
      _id: new mongoose.Types.ObjectId(id),
    });
    res.send(data);
  } catch (error) {
    res.status(400).send("Bad Request");
  }
};
