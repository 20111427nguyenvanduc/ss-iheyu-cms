import React from "react"
import Component from "../../pages/petition"

const title = "Danh sách phản ánh"

export default {
 path: ["/petition"],
 action(props) {
  return {
   title,
   component: <Component {...props} />,
  }
 },
}
