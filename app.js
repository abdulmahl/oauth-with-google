const express = require("express");
const app = express();
const session = require("express-session");
const connectDB = require("./models/connection");
const authRouter = require("./routes/auth-route");
const profileRouter = require("./routes/profile-route");
require("./config/passport-setup");
const passport = require("passport");
const port = process.env.PORT || 5001;

app.set("view engine", "ejs");

app.use(
  session({
    secret: process.env.COOKIE_KEY,
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth/", authRouter);
app.use("/profile", profileRouter);

app.get("/", (req, res) => {
  res.render("home", { user: req.user });
});

connectDB();

app.listen(port, () => {
  console.log(`App listening at ${port}...`);
});
