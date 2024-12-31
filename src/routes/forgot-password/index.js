import React from "react";
import Component from "../../pages/forgotPassword";

const title = "Quên mật khẩu";
const chunks = ["forgot-password"];

function action(props) {
  return {
    title,
    chunks,
    component: <Component {...props} />,
  };
}
export default action;
