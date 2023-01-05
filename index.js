const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const db = require("./config/db");
const dotenv = require("dotenv");
const path = require("path");
const passport = require("passport");
const cookieSession = require("cookie-session");
const api = require("./routes/index");

//load the config.env file
dotenv.config({ path: "./config/config.env" });

//Connect To Database
db();

require("./controllers/auth/passportGoogle");
//Create Express App
const app = express();

//Middleware

app.use(express.json());

app.use(morgan("dev"));

app.use(cors());

app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY],
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("hello");
});

//routes
app.use("/api", api);

//Set static folders
app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("server running on " + PORT);
});
