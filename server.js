const express = require("express");

const app = express();

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log("I AM ALIVE");
});

app.get("/", (req, res) => {
  res.send("HELLO WORLD");
});
