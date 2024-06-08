const userSchema = require("../schema/users");
const crypto = require("crypto");

module.exports = async (req, res) => {
  const { name, surname, email, password, province, district } = req.body;
  const hashedPassword = crypto
    .createHash("md5")
    .update(password)
    .digest("hex");
  try {
    const user = new userSchema({
      name,
      surname,
      email,
      password: hashedPassword,
      picture: "",
      googleId: null,
      province,
      district,
    });
    await user.save();
    console.log("User registered");
    res.send("User registered").status(200);
  } catch (error) {
    console.error(error.message);
    res.status(400).send("Bad Request");
  }
};
