import passport from "passport"
import bcrypt from "bcrypt"
const LocalStrategy = require("passport-local").Strategy

passport.use(
 new LocalStrategy((username, password, done) => {
  UsersModel.findOne({ $or: [{ email: username }, { username }] }).exec((err, user) => {
   if (err) {
    return done(err)
   }

   if (_.isUndefined(user)) {
    return done(null, false, {
     message: "Server Error",
    })
   }

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

   bcrypt.compare(password, user.password, (err, isMatch) => {
    if (isMatch === false) {
     return done(null, false, {
      message: "Tài khoản/mật khẩu không khớp",
     })
    }

    return done(null, user)
   })
  })
 }),
)

passport.serializeUser((user, done) => done(null, user._id))

passport.deserializeUser((id, done) =>
 UsersModel.findOne({ _id: id })
  .select("-ip -password -access_token")
  .exec((err, user) => done(err, user)),
)
