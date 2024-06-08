const mongoose = require("mongoose");
const newsSchema = require("../schema/news");
const userSchema = require("../schema/users");
const { OAuth2Client } = require("google-auth-library");

module.exports = async (req, res) => {
  const { code } = req.body;
  try {
    const client = new OAuth2Client(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_SECRET,
      "postmessage"
    );

    const gToken = await client.getToken(code);
    const ticket = await client.verifyIdToken({
      idToken: gToken?.tokens?.id_token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    if (!payload?.email_verified) return res.status(400).json("Bad Request");

    const userExist = await userSchema.findOne({ googleId: payload.sub });

    if (userExist) {
      console.log(userExist);
      res.status(200).json({
        name: userExist.name,
        surname: userExist.surname,
        email: userExist.email,
        picture: userExist.picture,
      });
      return;
    }
    const user = new userSchema({
      name: payload.given_name,
      surname: payload.family_name,
      email: payload.email,
      picture: payload.picture,
      googleId: payload.sub,
    });
    await user.save();

    res.status(200).json({
      name: user.name,
      surname: user.surname,
      email: user.email,
      picture: user.picture,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json("Bad Request");
  }
};
