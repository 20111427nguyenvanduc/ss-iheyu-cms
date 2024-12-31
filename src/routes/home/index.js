import React from "react";
import Component from "../../pages/home";

const title = "Trang chủ";
const chunks = ["home"];

function action(props) {
  return {
    title,
    chunks,
    component: <Component {...props} />,
  };
}
export default action;
