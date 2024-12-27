import React from "react"
import PostionDetail from "../../pages/positionDetail"

const title = "Chi tiết chức vụ"

export default {
 path: "/position/:id",
 action({ params }) {
  const { id } = params
  return {
   title: `Chi tiết chức vụ`,
   component: <PostionDetail id={id} />,
  }
 },
}
