const express = require("express");

const app = express();
app.set("view engine", "ejs");
// accept form data
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log("I AM ALIVE");
});

// send a form
app.get("/signup", (req, res) => {
  res.render("signup");
});

app.post("/signup", (req, res) => {
  console.log("FORM??", req.body);
});

app.get("/", (req, res) => {
  res.send("HELLO WORLD");
});
