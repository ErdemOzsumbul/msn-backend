const helperExpress = require("./src/helper/helperExpress");
const controller = require("./src/controller");
const mongoDB = require("./src/model/mongoDb");
const dotenv = require("dotenv");

dotenv.config();
const app = helperExpress();
const beginController = controller(app);
const beginMongoDB = mongoDB();
