import React from "react"
import NotFound from "../../pages/notFound"

const title = "Page Not Found"

export default {
 path: "*",

 action() {
  return {
   title,
   component: <NotFound title={title} />,
   status: 404,
  }
 },
}
