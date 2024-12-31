import React from "react"
import Component from "../../pages/petition/process"

const title = "Xử lý phản ánh"

export default {
 path: ["/petition/process"],
 action(props) {
  return {
   title,
   component: <Component {...props} />,
  }
 },
}
