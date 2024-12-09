import nodemailer from "nodemailer"
import { mail } from "../config"

export default {
 nodemailerAsync: (mailOptions) => {
  const setting = {
   service: "gmail",
   auth: {
    user: mail.sender,
    pass: mail.password,
   },
  }
  return new Promise((resolve, reject) => {
   let transporter = nodemailer.createTransport(setting)

   transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
     console.log("error is " + error)
     resolve(false, error)
    } else {
     console.log("Email sent: " + info.response)
     resolve(true)
    }
   })
  })
 },
}
