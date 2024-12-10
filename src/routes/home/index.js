import React from "react"
import Component from "../../pages/home"

const title = "Trang chủ"

export default {
 path: ["/", "/home"],
 action(props) {
  return {
   title,
   component: <Component {...props} />,
  }
 },
}
