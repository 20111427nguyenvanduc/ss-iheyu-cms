import React from "react"
import Component from "../../pages/userManager"

const title = "Vai trò"

export default {
 path: ["/user-manager"],
 action(props) {
  return {
   title,
   component: <Component {...props} />,
  }
 },
}
