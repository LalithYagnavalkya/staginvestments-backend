const mongoose = require("mongoose");
require("dotenv").config();

const connectDatabase = async () => {
  mongoose.set("strictQuery", false);
  const conn = await mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      // useCreateIndex: true,
      // useFindAndModify: false,
      // useUnifiedTopology: true,
    })
    .then(() => {
      console.log("db connected");
    })
    .catch((err) => {
      console.log("fucked up " + err);
    });
};

module.exports = connectDatabase;
