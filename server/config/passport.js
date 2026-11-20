const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/auth/google/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const email = profile.emails[0].value;

      // 1. Check if user already logged in with Google before
      let user = await User.findOne({ googleId: profile.id });
      if (user) return done(null, user);

      // 2. Check if a user already registered with this email via local auth
      user = await User.findOne({ email });
      if (user) {
        // Link Google ID and mark as verified to the existing account
        user.googleId = profile.id;
        user.isVerified = true;
        await user.save();
        return done(null, user);
      }

      // 3. Otherwise, create a brand new user
      user = await User.create({
        googleId: profile.id,
        name: profile.displayName,
        email: email,
        isVerified: true // Google accounts are pre-verified
      });
      
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  }
));

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});