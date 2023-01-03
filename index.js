const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const db = require("./config/db");
const dotenv = require("dotenv");
const path = require("path");

//load the config.env file
dotenv.config({ path: "./config/config.env" });

//Connect To Database
db();

//Create Express App
const app = express();

//Middleware

app.use(express.json());

app.use(morgan("dev"));

app.use(cors());

//Set static folders
app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("server running on" + PORT);
});
