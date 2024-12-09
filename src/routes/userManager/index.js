import React from "react"
import UserManagerComponent from "../../components/UserManager"

const title = "Quản lý tài khoản"

export default {
 path: "/admin/user-manager",
 action({ path }) {
  let data = {
   path,
   title,
  }
  return {
   ...data,
   component: <UserManagerComponent {...data} />,
  }
 },
}
