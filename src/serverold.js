import path from "path";
import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import React from "react";
import ReactDOM from "react-dom/server";
import UniversalRouter from "universal-router";
import PrettyError from "pretty-error";
import App from "./components/App";
import Html from "./components/Html";
import { ErrorPageWithoutStyle } from "./pages/error/ErrorPage";
import errorPageStyle from "./pages/error/ErrorPage.css";
import routes from "./routes";
import fs from "fs.extra";
import multipart from "connect-multiparty";
import passport from "passport";
import assets from "./assets.json"; // eslint-disable-line import/no-unresolved
import _ from "lodash";
import CONSTANT from "./const";
import { port, REDIS } from "./config";
const app = (global.app = express());
const multipartMiddleware = multipart();
const redis = require("redis");
global.moment = require("moment");
global.request = require("request");
global._ = require("lodash");
global.async = require("async");
global.axios = require("axios");
global.ms = require("ms");
global.CONSTANT = CONSTANT;
global.redisClient = redis.createClient(REDIS);
//
// Register Node.js middleware
// -----------------------------------------------------------------------------
app.set("views", path.join(__dirname, "content"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "build/public")));
app.set("view engine", "ejs");
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));

let RedisStore = require("connect-redis")(session);
redisClient.on("ready", (err) => {
  console.info(`[REDIS-${REDIS.host}] - READY`);
  setInterval(() => {
    redisClient.ping((err, data) => {
      if (err) console.error("Redis keepalive error", err);
    });
  }, 30000);
});

redisClient.on("ready", (err) => {
  console.log(`[REDIS] - READY`);
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
//middleware
// -----------------------------------------------------------------------------
require("./config/middleware");
require("./config/authentication");
require("./api");

if (__DEV__) {
  app.enable("trust proxy");
}

app.get("*", async (req, res, next) => {
  try {
    const css = new Set();
    // Global (context) variables that can be easily accessed from any React component
    // https://facebook.github.io/react/docs/context.html
    const context = {
      // Enables critical path CSS rendering
      // https://github.com/kriasoft/isomorphic-style-loader
      insertCss: (...styles) => {
        // eslint-disable-next-line no-underscore-dangle
        styles.forEach((style) => css.add(style._getCss()));
      },
    };

    const route = await UniversalRouter.resolve(routes, {
      path: req.path,
      query: req.query,
    });

    if (route.redirect) {
      res.redirect(route.status || 302, route.redirect);
      return;
    }

    const data = { ...route };
    data.children = ReactDOM.renderToString(<App context={context}>{route.component}</App>);
    data.styles = [{ id: "css", cssText: [...css].join("") }];
    data.scripts = [assets.vendor.js, assets.client.js];
    if (assets[route.chunk]) {
      data.scripts.push(assets[route.chunk].js);
    }

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

app.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  console.log(pe.render(err)); // eslint-disable-line no-console
  const html = ReactDOM.renderToStaticMarkup(
    <Html title="Internal Server Error" description={err.message} styles={[{ id: "css", cssText: errorPageStyle._getCss() }]}>
      {ReactDOM.renderToString(<ErrorPageWithoutStyle error={err} />)}
    </Html>
  );
  res.status(err.status || 300);
  res.send(`<!doctype html>${html}`);
});

const server = require("http").createServer(app);

// Launch the server
// -----------------------------------------------------------------------------
/* eslint-disable no-console */

process.on("uncaughtException", (err, origin) => {
  console.error(new Date().toUTCString() + " uncaughtException:", err.message);
  console.error(err.stack);
  fs.writeSync(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
});

server.listen(port, () => {
  console.log(`The server is running at http://localhost:${port}/`);
});
/* eslint-enable no-console */
