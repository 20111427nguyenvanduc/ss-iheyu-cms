/* eslint-disable global-require */

// The top-level (parent) route
const routes = {
 path: "",

 // Keep in mind, routes are evaluated in order
 children: [
  {
   path: "/home",
   load: () => import(/* webpackChunkName: 'home' */ "./home"),
  },
  {
   path: "/petition/list",
   load: () => import(/* webpackChunkName: 'list-petition' */ "./petition/list"),
  },
  {
   path: "/petition/list-for-individual",
   load: () => import(/* webpackChunkName: 'list-for-individual' */ "./petition/listForIndividual"),
  },
  {
   path: ["/category"],
   load: () => import(/* webpackChunkName: 'category' */ "./category"),
  },
  {
   path: ["/user-manager"],
   load: () => import(/* webpackChunkName: 'user-manager' */ "./userManager"),
  },
  {
   path: "/user-manager/:id",
   load: () => import(/* webpackChunkName: 'user-manager-detail' */ "./userManager/detail"),
  },

  {
   path: ["/unit"],
   load: () => import(/* webpackChunkName: 'unit' */ "./unit"),
  },
  {
   path: "/unit/:id",
   load: () => import(/* webpackChunkName: 'unit-detail' */ "./unit/detail"),
  },
  {
   path: ["/analytic"],
   load: () => import(/* webpackChunkName: 'analytic' */ "./analytic"),
  },
  {
   path: ["/analytic/unit"],
   load: () => import(/* webpackChunkName: 'analytic-unit' */ "./analytic/unit"),
  },

  {
   path: "/position/:id",
   load: () => import(/* webpackChunkName: 'position-detail' */ "./position/detail"),
  },

  {
   path: "/login",
   load: () => import(/* webpackChunkName: 'login' */ "./login"),
  },
  {
   path: "/forgot-password",
   load: () => import(/* webpackChunkName: 'forgot-password' */ "./forgot-password"),
  },
  {
   path: "/group-permission/:id",
   load: () => import(/* webpackChunkName: 'group-permission-detail' */ "./group-permission/detail"),
  },
  {
   path: "/group-permission",
   load: () => import(/* webpackChunkName: 'group-permission' */ "./group-permission"),
  },
  {
   path: "/permissions",
   load: () => import(/* webpackChunkName: 'permissions' */ "./permissions"),
  },
  {
   path: "/digital-utilities/:id",
   load: () => import(/* webpackChunkName: 'digital-utilities-detail' */ "./digitalUtilities/detail"),
  },
  {
   path: "/digital-utilities",
   load: () => import(/* webpackChunkName: 'digital-utilities' */ "./digitalUtilities"),
  },
  {
   path: "(.*)",
   load: () => import(/* webpackChunkName: 'not-found' */ "./not-found"),
  },
 ],

 async action({next}) {
  // Execute each child route until one of them return the result
  const route = await next()

  // Provide default values for title, description etc.
  route.title = `${route.title || "Untitled Page"} - HeyU`
  route.description = route.description || ""

  return route
 },
}

// The error page is available by permanent url for development mode
if (__DEV__) {
 routes.children.unshift({
  path: "/error",
  action: require("./error").default,
 })
}

export default routes
