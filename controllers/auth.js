import User from "../models/user";
import jwt from "jsonwebtoken";
import expressJwt from "express-jwt";
// import { checkAdmin } from "../validator";
// import { errorHandler } from "../helpers/dbErrorsHandler";

export const signup = (req, res) => {
  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json({ user });
  });
};
exports.signin = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }, (error, user) => {
    if (error || !user) {
      return res.status(400).json({
        error: "User with that email does not exist. Please signup",
      });
    }
    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Email and password not match",
      });
    }
    const token = jwt.sign({ _id: user._id }, "trungday");
    res.cookie("t", token, { expire: new Date() + 9999 });
    const { _id, name, email, role } = user;
    return res.json({
      token,
      user: { _id, email, name, role },
    });
  });
};

export const signout = (req, res) => {
  res.clearCookie("t");
  res.json({
    message: "Signout Success",
  });
};

export const requireSignin = expressJwt({
  secret: "trungday",
  algorithms: ["HS256"],
  userProperty: "auth",
});

export const isAuth = (req, res, next) => {
  let user = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!user) {
    return res.status(403).json({
      error: `"Access Denied" ${user}`,
    });
  }
  next();
};

export const isAdmin = (req, res, next) => {
  if (req.profile.role == 0) {
    return res.status(403).json({
      error: "Admin resource! Access Denined",
    });
  }
  next();
};
