import User from "../models/user";
import jwt from "jsonwebtoken";
import expressJwt from "express-jwt";
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
export const signin = (req, res) => {
  const _email = req.body.email;
  const _password = req.body.password;

  User.exists({ email: _email })
    .then((user) => {
      User.find({ email: _email }).then((user) => {
        res.json(user);
      });
    })
    .catch((err) => {
      res.send("Tài khoản không tồn tại");
    });
};
