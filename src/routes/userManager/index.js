import React from "react"
import Component from "../../pages/userManager"

const title = "Quản lý tài khoản"

export default {
 path: ["/user-manager"],
 action(props) {
  return {
   title,
   component: <Component {...props} />,
  }
 },
}
