import React from "react"
import Component from "../../pages/unit"

const title = "Quản lý đơn vị"

export default {
 path: "/unit/:id",
 action({params}) {
  const {id} = params
  return {
   title,
   component: <Component id={id} />,
  }
 },
}
