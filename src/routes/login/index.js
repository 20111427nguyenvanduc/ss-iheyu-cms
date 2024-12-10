import React from "react"
import Login from "../../pages/login"

const title = "Đăng nhập"

export default {
 path: "/login",
 action() {
  return {
   title,
   component: <Login title={title} />,
  }
 },
}
