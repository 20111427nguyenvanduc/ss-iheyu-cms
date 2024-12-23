import passport from "passport"
import bcrypt from "bcrypt"
const LocalStrategy = require("passport-local").Strategy
import {IHEYU_SERVICE} from "../config.js"
import {apiPost} from "../api/api"

passport.use(
 new LocalStrategy((username, password, done) => {
  const url = `${IHEYU_SERVICE}/api/v1.0/admin/login`
  const body = {username, password}
  apiPost(url, body, (err, result) => {
   if (err) {
    return done(err)
   }
   const user = _.get(result, "data")
   if (!user) {
    return done(null, false, {
     message: "Không tìm thấy người dùng này",
    })
   }
   if (!user.active) {
    return done(null, false, {
     message: "Người dùng bị vô hiệu hóa",
    })
   }
   return done(null, user)
  })
 }),
)

passport.serializeUser((user, done) => done(null, {user}))

passport.deserializeUser(({user}, done) => {
 done(null, user)
})
