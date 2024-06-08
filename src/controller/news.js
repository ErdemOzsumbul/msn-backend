const newsSchema = require("../schema/news");

module.exports = async (req, res) => {
  try {
    const data = await newsSchema.aggregate([
      {
        $project: {
          title: 1,
          image: 1,
          description: 1,
          type: 1,
          source: 1,
          timestamp: 1,
        },
      },
    ]);
    res.send(data);
  } catch (error) {
    res.status(400).send("Bad Request");
  }
};
