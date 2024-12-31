import { Router } from "express";
import passport from "passport";
import { IHEYU_SERVICE } from "../config";

const login = (req, res, next) => {
  const { lastpath, username } = req.body;
  let ip = `${req.headers["x-real-ip"]} ${req.headers["x-forwarded-for"]} ${req.socket.remoteAddress} ${req.ip}`;
  passport.authenticate("local", (err, user, info = {}) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      res.json({
        code: 400,
        message: info.message,
      });
    } else {
      // if everything's OK
      req.logIn(user, (err) => {
        if (err) {
          req.session.messages = "Error";
          return next(err);
        }
      });
      res.json({
        code: 200,
        data: "/",
      });
    }
  })(req, res, next);
};

const logout = (req, res) => {
  req.logout();
  res.redirect("/login");
};

export default {
  login,
  logout,
};
