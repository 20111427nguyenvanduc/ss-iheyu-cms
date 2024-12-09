/*jslint es6 */
import { NEW_JOB_URL } from "../config.js"
import { apiPost } from "./api"
import bcrypt from "bcrypt"
export default {
 userInf(req, res) {
  res.json({
   code: CONSTANT.CODE.SUCCESS,
   data: req.user,
  })
 },
 changePassword(req, res) {
  if (req.body.newPassword !== req.body.confirmPassword || req.body.newPassword.length < 8 || req.body.confirmPassword.length < 8) {
   return res.json({ code: 209, message: "Mật khẩu mới không hợp lệ" })
  }

  UsersRead.findOne({ _id: req.body.user._id }, (err, user) => {
   if (err) return console.log(err)
   bcrypt.compare(req.body.oldPassword, user.password, (err, isMatch) => {
    if (isMatch === false) {
     return res.json({ code: 209, message: "Mật khẩu cũ không chính xác" })
    }

    bcrypt.hash(req.body.confirmPassword, 8, (err, hash) => {
     user.password = hash
     user.save()
     res.json({ code: 200, message: "Thay đổi mật khẩu thành coong" })
    })
   })
  })
 },
 getRegion(req, res) {
  RegionsRead.find({
   active: 1,
  })
   .select(`key name active`)
   .lean()
   .exec((err, regions) => {
    let regionObj = {}
    regions.forEach((region) => {
     regionObj[region.key] = region.name
    })
    res.json({
     code: CONSTANT.CODE.SUCCESS,
     data: regionObj,
    })
   })
 },
}
