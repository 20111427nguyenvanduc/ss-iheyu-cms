/* eslint-disable global-require */

// The top-level (parent) route
export default {
 path: "/",

 children: [require("./login").default, require("./home").default, require("./notFound").default],

 async action({ next }) {
  const route = await next()
  route.title = `${route.title} | IHeyU`
  route.description = route.description || ""
  return route
 },
}
