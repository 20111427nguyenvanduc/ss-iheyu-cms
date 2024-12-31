import React from "react";
import Component from "../../pages/login";

const title = "Đăng nhập";
const chunks = ["login"];

function action(props) {
  return {
    title,
    chunks,
    component: <Component {...props} />,
  };
}
export default action;
