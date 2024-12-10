import { Router } from "express"
import passport from "passport"

const login = (req, res, next) => {
 const { lastpath, username } = req.body
 let ip = `${req.headers["x-real-ip"]} ${req.headers["x-forwarded-for"]} ${req.socket.remoteAddress} ${req.ip}`
 passport.authenticate("local", (err, user, info = {}) => {
  if (err) {
   return next(err)
  }
  if (!user) {
   ActivityLogsModel.createLog({
    body: {
     action: "Đăng nhập thất bại",
     reason: ip,
     username,
    },
    user,
   })
   res.json({
    code: 400,
    message: info.message,
   })
  } else {
   // if everything's OK
   req.logIn(user, (err) => {
    if (err) {
     req.session.messages = "Error"
     return next(err)
    }
   })
   if (user) {
    ActivityLogsModel.createLog({
     body: {
      action: "Đăng nhập thành coong",
      reason: ip,
      username,
     },
     user,
    })
   }
   res.json({
    code: 200,
    data: lastpath || "/",
   })
  }
 })(req, res, next)
}

const logout = (req, res) => {
 req.logout()
 res.redirect("/login")
}

const userInf = (req, res) => {
 res.json({
  code: CONSTANT.CODE.SUCCESS,
  data: req.user,
 })
}

export default {
 login,
 logout,
 userInf,
}
