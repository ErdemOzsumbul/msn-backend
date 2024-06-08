const mongoose = require("mongoose");

const mongoDb = async () => {
  const email = process.env.EMAIL;
  const password = process.env.PASSWORD;
  const cluster = process.env.CLUSTER;
  console.log(email, password, cluster);
  const uri = `mongodb+srv://${email}:${password}@${cluster}.cg5mxat.mongodb.net/hepsiburada?retryWrites=true&w=majority`;
  const con = mongoose.connection;

  mongoose.connection.on("connecting", () => {
    console.info("connecting to mongodb");
  });

  mongoose.connection.on("connected", () => {
    console.info("connected to mongodb");
  });

  mongoose.connection.on("disconnecting", () => {
    console.warn("disconnecting to mongodb");
  });

  mongoose.connection.on("disconnected", () => {
    console.warn("disconnected to mongodb");
  });

  mongoose.connection.on("error", err => {
    console.error("connection error:", err);
    mongoose.disconnect();

    setTimeout(() => {
      mongoose.connect(uri).catch(err => console.error("error"));
    }, 5000);
  });

  mongoose.connection.on("reconnected", () => {
    console.info("reconnected to Mongodb");
  });

  mongoose.connect(uri).catch(err => console.error("error"));

  return con;
};

module.exports = mongoDb;
