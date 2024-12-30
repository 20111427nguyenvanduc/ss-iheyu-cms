"use strict"
import {mail} from "../config"
import {eatcake} from "../helpers"

app.use((req, res, next) => {
 if (!req.isAuthenticated() && req.originalUrl.indexOf("/forgot-password") >= 0) {
  return next()
 }

//  if (!req.isAuthenticated() && req.originalUrl.indexOf("/login") < 0) {
//   if (req.method === "POST") {
//    return res.json({code: 1993})
//   }
//   return res.redirect("/login")
//  }

 if (req.isAuthenticated() && req.user && !req.user.status) {
  req.logout()
  return res.redirect("/login")
 }

 if (req.isAuthenticated() && (req.originalUrl.indexOf("/login") >= 0 || req.originalUrl.indexOf("/forgot-password") >= 0)) {
  return res.redirect("/")
 }

 next()
})
