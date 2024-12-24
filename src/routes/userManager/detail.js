import React from "react"
import Component from "../../pages/userManager/detail"

const title = "Hồ sơ tài khoản"

export default {
 path: "/user-manager/:id",
 action({ params }) {
  const { id } = params
  return {
   title,
   component: <Component id={id} />,
  }
 },
}
