import React from "react"
import Component from "../../pages/permissions"

const title = "Quyền chức năng"

export default {
 path: ["/permissions"],
 action(props) {
  return {
   title,
   component: <Component {...props} />,
  }
 },
}
