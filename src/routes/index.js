import React, {useState} from "react"
import GroupPermissionDetail from "../pages/groupPermissionDetail"

/* eslint-disable global-require */
// The top-level (parent) route
export default {
 path: "/",

 children: [
  require("./login").default,
  require("./forgotPassword").default,
  require("./home").default,
  require("./groupPermission").default,
  require("./permissions").default,
  require("./role").default,
  {
   path: "/group-permission/:id",
   action({params}) {
    const {id} = params
    return {
     title: `Chi tiết của nhóm quyền`,
     component: <GroupPermissionDetail id={id} />,
    }
   },
  },
  require("./notFound").default,
 ],

 async action({next}) {
  const route = await next()
  route.title = `${route.title} | IHeyU`
  route.description = route.description || ""
  return route
 },
}
