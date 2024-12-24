import React from "react"
import Component from "../../pages/unit"

const title = "Quản lý đơn vị"

export default {
 path: ["/unit"],
 action(props) {
  return {
   title,
   component: <Component {...props} />,
  }
 },
}
