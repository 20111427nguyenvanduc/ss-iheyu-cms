import React from "react"
import Component from "../../pages/analytic"
import _ from "lodash"

const title = "Thống kê đơn vị xử lý"
const chunks = ["analytic-unit"]

function action(props) {
 return {
  title,
  chunks,
  component: <Component {...props} />,
 }
}
export default action
