const passport = require('passport');
//const passportLocal = require('passport-local');
const passportFacebook = require('passport-facebook');
const { UserModel } = require('../models/user');

const facebookStrategy = passportFacebook.Strategy;
//const LocalStrategy = passportLocal.Strategy;

const strategyOptions = {
  clientID: '1030824967750278', 
  clientSecret: '88f4d123b4fd5e3865ab1b1374c47ea2', 
  callbackURL: 'http://localhost:8080/api/auth/facebook/callback',
  profileFields: ['id', 'displayName', 'photos', 'emails']
};

const loginFunc = async (accessToken, refreshToken, profile, done) => {
  return done(null, profile);
};

passport.use(new facebookStrategy(strategyOptions, loginFunc));

passport.serializeUser(function(user, cb) {
  cb(null, user)
})
passport.deserializeUser(function(obj, cb){
  cb(null, obj)
})

module.exports = passport;
