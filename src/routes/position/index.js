import React from "react"
import Component from "../../pages/groupPermission"

const title = "Nhóm quyền"

export default {
 path: ["/group-permission"],
 action(props) {
  return {
   title,
   component: <Component {...props} />,
  }
 },
}
