import React from "react"
import Component from "../../pages/unit"
import _ from "lodash"

const title = "Quản lý đơn vị"
const chunks = ["unit-detail"]

function action(props) {
 return {
  title,
  chunks,
  component: <Component {...props} id={_.get(props, "params.id")} />,
 }
}
export default action
