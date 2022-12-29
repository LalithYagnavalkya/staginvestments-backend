const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send(<a href="/auth/google/">Login</a>);
});
