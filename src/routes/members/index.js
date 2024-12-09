import React from "react"
import MembersComponent from '../../components/Members'

const title = "Quản lý thành viên"

export default {
 path: "/admin/members",

 action({ path }) {
  let data = {
   path: path,
   title,
  }

  return {
   ...data,
   component: <MembersComponent {...data} />,
  }
 },
}
