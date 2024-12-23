import React from "react"
import Component from "../../pages/role"

const title = "Vai trò"

export default {
 path: ["/role"],
 action(props) {
  return {
   title,
   component: <Component {...props} />,
  }
 },
}
