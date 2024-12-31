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
      path: ["/category"],
      load: () => import(/* webpackChunkName: 'category' */ "./category"),
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
      path: "(.*)",
      load: () => import(/* webpackChunkName: 'not-found' */ "./not-found"),
    },
  ],

  async action({ next }) {
    // Execute each child route until one of them return the result
    const route = await next();

    // Provide default values for title, description etc.
    route.title = `${route.title || "Untitled Page"} - HeyU`;
    route.description = route.description || "";

    return route;
  },
};

// The error page is available by permanent url for development mode
if (__DEV__) {
  routes.children.unshift({
    path: "/error",
    action: require("./error").default,
  });
}

export default routes;
