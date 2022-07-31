import express from "express";
import passport from "passport";
import FacebookStrategy from "passport-facebook";
import routes from "../common/routes";

export const passportInit = () => {
  const facebookOptions = {
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: process.env.HOST + routes.facebookCallback,
    profileFields: ["id", "displayName", "email", "picture.type(large)"],
  };

  // prettier-ignore
  const onSuccess = (accessToken, refreshToken, profile, cb) => {
		Promise.all([
			console.log('Save accessToken: ', accessToken),
			console.log('Save refreshToken: ', refreshToken),
			console.log(profile)
		]).then(() => cb(null, profile));
	};

  passport.use(new FacebookStrategy(facebookOptions, onSuccess));
};

const authRouter = express.Router();
const route = name => routes[name].replace("/api/auth", "");

authRouter.get(route("facebookLogin"), passport.authenticate("facebook"));

authRouter.get(route("facebookCallback"), passport.authenticate("facebook", { failureRedirect: "/" }), (req, res) => res.redirect("/"));

authRouter.get(route("logout"), (req, res) => {
  req.logout();
  res.redirect("/");
});

export default authRouter;
