import React from "react"
import GroupPermissionDetail from "../../pages/groupPermissionDetail"

const title = "Nhóm quyền"

export default {
 path: "/group-permission/:id",
 action({ params }) {
  const { id } = params
  return {
   title: `Chi tiết của nhóm quyền`,
   component: <GroupPermissionDetail id={id} />,
  }
 },
}
