const mongoose = require("mongoose");
require("dotenv/config");
const uri = process.env.MONGO_URI;

const connectDB = async () => {
  mongoose
    .connect(uri)
    .then(() => {
      console.log("Connected to mongodb...");
    })
    .catch((err) => {
      console.error("Connection to mongodb failed", err);
    });
    
  process.on("SIGINT", () => {
    mongoose.connection.close();
    console.log("Connection to mongodb closed!");
    process.exit(0);
  });
};

module.exports = connectDB;
