import React from "react"
import Component from "../../pages/category"

const title = "Danh mục phản ánh"

export default {
 path: ["/category"],
 action(props) {
  return {
   title,
   component: <Component {...props} />,
  }
 },
}
