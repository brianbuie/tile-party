/*
	Init
*/
import express from "express";
import routes from "../../common/routes";
const auth = express.Router();

/*
	Models
*/
import mongoose from "mongoose";
import "./UserModel";
import "./AccountModel";
const User = mongoose.model("User");
const Account = mongoose.model("Account");

/*
	Session Storage
*/
import session from "express-session";
import MongoStore from "connect-mongo";
const sessionOptions = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
};
auth.use(session(sessionOptions));

/*
	Passport setup
*/
import passport from "passport";
import FacebookStrategy from "passport-facebook";
const facebookOptions = {
  clientID: process.env.FACEBOOK_CLIENT_ID,
  clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
  callbackURL: process.env.HOST + routes.facebookCallback,
  profileFields: ["id", "displayName", "email", "photos"],
};
const onSuccess = async (accessToken, refreshToken, profile, done) => {
  try {
    let account = await Account.findOne({ providerAccountId: profile.id }).populate("user");
    if (account?.user) return done(null, account.user);
    const user = new User({
      name: profile.displayName,
      email: profile._json.email,
      image: profile._json?.picture?.data?.url,
    });
    await user.save();
    account = new Account({
      user,
      provider: "facebook",
      type: "oauth",
      providerAccountId: profile.id,
      accessToken,
      refreshToken,
    });
    await account.save();
    return done(null, user);
  } catch (e) {
    done(e, null);
  }
};
passport.use(new FacebookStrategy(facebookOptions, onSuccess));
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => User.findById(id, done));
auth.use(passport.initialize());
auth.use(passport.session());

/*
	Routes
*/
const route = name => routes[name].replace("/api", "");
auth.get(route("me"), (req, res) => res.json(req.user));
auth.get(route("facebookLogin"), passport.authenticate("facebook"));
auth.get(route("facebookCallback"), passport.authenticate("facebook", { failureRedirect: "/" }), (req, res) => res.redirect("/"));
auth.get(route("logout"), (req, res, next) => req.logout(err => (err ? next(err) : res.redirect("/"))));

export default auth;
