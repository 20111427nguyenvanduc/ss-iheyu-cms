import React from "react"
import ForgotPassword from "../../pages/forgotPassword"

const title = "Quên mật khẩu"

export default {
 path: "/forgot-password",
 action() {
  return {
   title,
   component: <ForgotPassword title={title} />,
  }
 },
}
