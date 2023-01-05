const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

require("dotenv").config();
const User = require("../../models/User");

const GOOGLE_CALLBACK_URL = `${process.env.GOOGLE_CALLBACK_URL}`;
console.log(process.env.GOOGLE_CLIENT_ID);
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: GOOGLE_CALLBACK_URL,
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, cb) => {
      const defaultUser = {
        username: `${profile.name.givenName} ${profile.name.familyName}`,
        email: profile.emails[0].value,
        avatar: profile.photos[0].value,
        googleId: profile.id,
      };

      let user = await User.findOne({ googleId: profile.id }).catch((err) => {
        console.log("Error signing up", err);
        cb(err, null);
      });

      if (!user) {
        const newUser = await new User(defaultUser);
        await newUser.save();
        user = newUser;
      }

      if (user) {
        return cb(null, user);
      }
    }
  )
);

passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser(async (id, cb) => {
  const user = await User.findById(id).catch((err) => {
    console.log("Error deserializing", err);
    cb(err, null);
  });

  if (user) cb(null, user);
});
