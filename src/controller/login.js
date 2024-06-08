const mongoose = require("mongoose");
const newsSchema = require("../schema/news");
const userSchema = require("../schema/users");
const { OAuth2Client } = require("google-auth-library");
const crypto = require("crypto");

module.exports = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userSchema.findOne({
      email,
      password: crypto.createHash("md5").update(password).digest("hex"),
      googleId: null,
    });
    if (!user) return res.status(400).send("Bad Request");
    res
      .send({
        email: user.email,
        surname: user.surname,
      })
      .status(200);
  } catch (error) {
    console.error(error.message);
    res.status(400).send("Bad Request");
  }
};
