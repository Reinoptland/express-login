const dotenv = require("dotenv");
// load secrets from the .env file
dotenv.config();

const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
const COOKIE_SECRET = process.env.COOKIE_SECRET;

// Encrypt -> something unreadble (encrypted) -> Decrypt -> something readable
// Something readable -> Hash -> something unreadble
// Something to check -> Hash -> something unreadble <-- compare --> something unreadble

app.use(cookieParser(COOKIE_SECRET));
app.set("view engine", "ejs");
// accept form data
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 4000;

const users = [];

app.listen(PORT, () => {
  console.log("I AM ALIVE");
});

// send a form
app.get("/signup", (req, res) => {
  res.render("signup", { error: null });
});

app.post("/signup", (req, res) => {
  console.log("FORM??", req.body);
  // undefined
  // {}
  const existingUser = users.find(
    (user) => user.username === req.body.username
  );

  if (existingUser === undefined) {
    users.push(req.body);
    res.redirect("/login");
  } else {
    res.render("signup", {
      error: "You need to be more original, this user exists",
    });
  }
});

// login formulier
app.get("/login", (req, res) => {
  res.render("login", { error: null });
});

app.post("/login", (req, res) => {
  console.log(req.body.username, req.body.password);

  // check in array, does this user exist?
  const existingUser = users.find(
    (user) => user.username === req.body.username
  );

  // early exit, nope!
  if (existingUser === undefined) {
    return res.render("login", { error: "This user doesn't exist man" });
  }

  // if it exists, does the password match?
  if (req.body.password !== existingUser.password) {
    return res.render("login", { error: "Wrong password, man" });
  }

  // Both yes? you are now logged in! ✨
  // 🍪
  res.cookie("username", req.body.username, {
    maxAge: 900000,
    httpOnly: true,
    signed: true,
  });
  res.redirect("/secretpage");
});

app.get("/secretpage", (req, res) => {
  if (!req.signedCookies.username) {
    return res.redirect("/login");
  }

  console.log(req.cookies);
  console.log(req.signedCookies);
  console.log(users);
  res.render("secret", { username: req.signedCookies.username });
});

app.get("/", (req, res) => {
  console.log(req.cookies);
  res.send("HELLO WORLD");
});
