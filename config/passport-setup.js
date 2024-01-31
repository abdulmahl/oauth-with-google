const passport = require("passport");
require("dotenv/config");
const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/user-model");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: client_id,
      clientSecret: client_secret,
      callbackURL: "/auth/google/redirect",
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      User.findOne({ googleId: profile.id })
        .then((currentUser) => {
          if (currentUser) {
            console.log(`Current user: ${currentUser}`);
            done(null, currentUser);
          } else {
            new User({
              username: profile.displayName,
              googleId: profile.id,
              thumbnail: profile._json.picture,
            })
              .save()
              .then((newUser) => {
                console.log(`New user created: ${newUser}`);
                done(null, newUser);
              })
              .catch((err) => {
                console.error("Error saving new user:", err);
                done(err, null);
              });
          }
        })
        .catch((err) => {
          console.error("Error finding user:", err);
          done(err, null);
        });
    }
  )
);
