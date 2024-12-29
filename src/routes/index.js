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
  require("./permissions").default,
  require("./role").default,
  require("./groupPermission").default,
  require("./groupPermission/detail").default,
  require("./userManager").default,
  require("./unit").default,
  require("./userManager/detail").default,
  require("./position/detail").default,
  require("./unit/detail").default,
  require("./category").default,
  require("./notFound").default,
 ],

 async action({next}) {
  const route = await next()
  route.title = `${route.title} | IHeyU`
  route.description = route.description || ""
  return route
 },
}
