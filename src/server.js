import path from "path";
import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import nodeFetch from "node-fetch";
import React from "react";
import ReactDOM from "react-dom/server";
import PrettyError from "pretty-error";
import App from "./components/App";
import Html from "./components/Html";
import { ErrorPageWithoutStyle } from "./routes/error/ErrorPage";
import errorPageStyle from "./routes/error/ErrorPage.css";
import passport from "passport";
import router from "./router";
import CONSTANT from "./const";
import multipart from "connect-multiparty";
// const cors = require("cors");
const redis = require("redis");
// import assets from './asset-manifest.json'; // eslint-disable-line import/no-unresolved
import chunks from "./chunk-manifest.json"; // eslint-disable-line import/no-unresolved
import { port, REDIS } from "./config";
global.multipartMiddleware = multipart();

process.on("unhandledRejection", (reason, p) => {
  console.error("Unhandled Rejection at:", p, "reason:", reason);
  // send entire app down. Process manager will restart it
  process.exit(1);
});

//
// Tell any CSS tooling (such as Material UI) to use all vendor prefixes if the
// user agent is not known.
// -----------------------------------------------------------------------------
const app = (global.app = express());
global.moment = require("moment");
global._ = require("lodash");
global.async = require("async");
global.axios = require("axios");
global.ms = require("ms");
global.passport = passport;
global.CONSTANT = CONSTANT;

//
// If you are using proxy from external machine, you can set TRUST_PROXY env
// Default is to trust proxy headers only from loopback interface.
// -----------------------------------------------------------------------------
// app.use(cors());
app.set("trust proxy");
//
// Register Node.js middleware
// -----------------------------------------------------------------------------
app.use(express.static(path.resolve(__dirname, "public")));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let RedisStore = require("connect-redis")(session);
let redisClient = redis.createClient(REDIS);
redisClient.on("ready", (err) => {
  console.info(`[REDIS-${REDIS.host}] - READY`);
  setInterval(() => {
    redisClient.ping((err, data) => {
      if (err) console.error("Redis keepalive error", err);
    });
  }, 30000);
});
app.use(
  session({
    secret: "iheyu-token-cms",
    key: "iheyu-token-cms",
    resave: false,
    saveUninitialized: false,
    store: new RedisStore({ client: redisClient }),
    cookie: {
      maxAge: ms("90d"),
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

//
// Authentication
// -----------------------------------------------------------------------------
require("./config/middleware");
require("./config/authentication");
require("./api");

// Register server-side rendering middleware
// -----------------------------------------------------------------------------
app.get("*", async (req, res, next) => {
  try {
    const css = new Set();

    // Enables critical path CSS rendering
    // https://github.com/kriasoft/isomorphic-style-loader
    const insertCss = (...styles) => {
      // eslint-disable-next-line no-underscore-dangle
      styles.forEach((style) => css.add(style._getCss()));
    };

    // Global (context) variables that can be easily accessed from any React component
    // https://facebook.github.io/react/docs/context.html
    const context = {
      // The twins below are wild, be careful!
      pathname: req.path,
      query: req.query,
    };

    const route = await router.resolve(context);

    if (route.redirect) {
      res.redirect(route.status || 302, route.redirect);
      return;
    }

    const data = { ...route };
    data.children = ReactDOM.renderToString(
      <App context={context} insertCss={insertCss}>
        {route.component}
      </App>
    );
    data.styles = [{ id: "css", cssText: [...css].join("") }];

    const scripts = new Set();
    const addChunk = (chunk) => {
      if (chunks[chunk]) {
        chunks[chunk].forEach((asset) => scripts.add(asset));
      } else if (__DEV__) {
        throw new Error(`Chunk with name '${chunk}' cannot be found`);
      }
    };
    addChunk("client");
    if (route.chunk) addChunk(route.chunk);
    if (route.chunks) route.chunks.forEach(addChunk);

    data.scripts = Array.from(scripts);
    data.app = {
      // apiUrl: config.api.clientUrl,
    };

    const html = ReactDOM.renderToStaticMarkup(<Html {...data} />);
    res.status(route.status || 200);
    res.send(`<!doctype html>${html}`);
  } catch (err) {
    next(err);
  }
});

//
// Error handling
// -----------------------------------------------------------------------------
const pe = new PrettyError();
pe.skipNodeFiles();
pe.skipPackage("express");

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  if (_.isError(err)) {
    if (err.message == "Failed to deserialize user out of session") {
      req.logout();
      return res.redirect("/login");
    }
  }
  const html = ReactDOM.renderToStaticMarkup(
    <Html
      title="Internal Server Error"
      description={err.message}
      styles={[{ id: "css", cssText: errorPageStyle._getCss() }]} // eslint-disable-line no-underscore-dangle
    >
      {ReactDOM.renderToString(<ErrorPageWithoutStyle error={err} />)}
    </Html>
  );
  res.status(err.status || 500);
  res.send(`<!doctype html>${html}`);
});

//
// Launch the server
// -----------------------------------------------------------------------------
if (!module.hot) {
  app.listen(port, () => {
    console.info(`The server is running at http://localhost:${port}/`);
  });
}

//
// Hot Module Replacement
// -----------------------------------------------------------------------------
if (module.hot) {
  app.hot = module.hot;
  module.hot.accept("./router");
}

export default app;
