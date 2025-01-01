import React from "react";
import { analytics } from "../config";
import serialize from "serialize-javascript";

export default function Html({ title, description, styles = [], scripts = [], app, children }) {
  return (
    <html className="no-js" lang="vi" translate="no">
      <head>
        <meta charSet="utf-8" />
        <meta name="google" content="notranslate" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/images/logo.png" />
        {/* <link href="/css/bootstrap.min.css" rel="stylesheet" /> */}
        {/* <link href="/css/style.css" rel="stylesheet" /> */}
        <link href="/css/toastr/toastr.min.css" rel="stylesheet" />
        <link href="/font-awesome/css/font-awesome.css" rel="stylesheet" />
        <link href="/penguin-icon/bold/style.css" rel="stylesheet" />
        <link href="/penguin-icon/linear/style.css" rel="stylesheet" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
          rel="stylesheet"
        />

        {scripts.map((script) => (
          <link key={script} rel="preload" href={script} as="script" />
        ))}
        {styles.map((style) => (
          <style key={style.id} id={style.id} dangerouslySetInnerHTML={{ __html: style.cssText }} />
        ))}
        {/* <script src="/js/jquery-3.7.1.js"></script> */}
        {/* <script src="/js/bootstrap.min.js"></script> */}
      </head>
      <body className="mini-navbar skin-default full-height-layout no-skin-config white-bg">
        <div id="app" dangerouslySetInnerHTML={{ __html: children }} />
        <script dangerouslySetInnerHTML={{ __html: `window.App=${serialize(app)}` }} />
        {scripts.map((script) => (
          <script key={script} src={script} />
        ))}
      </body>
    </html>
  );
}
