const authRouter = require("express").Router();
const passport = require("passport");

authRouter.get("/login", (req, res) => {
  res.render("login", { user: req.user });
});

authRouter.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error("Error during logout:", err);
      return res.redirect("/");
    }
    res.render("home", { user: req.user });
  });
});

authRouter.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile"],
  })
);

authRouter.get(
  "/google/redirect",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    // res.send(req.user);
    res.redirect("/profile/");
  }
);

module.exports = authRouter;
