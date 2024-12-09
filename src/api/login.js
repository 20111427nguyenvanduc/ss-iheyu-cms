import { Router } from "express"
import passport from "passport"
const router = new Router()

router.post("/login", (req, res, next) => {
 passport.authenticate("local", (err, user, info) => {
  if (err) {
   return next(err)
  }

  if (!user) {
   res.json({
    status: "error",
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
  }
 })(req, res, next)
})

export default router
