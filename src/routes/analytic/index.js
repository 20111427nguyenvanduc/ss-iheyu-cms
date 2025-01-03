import React from "react";
import Component from "../../pages/analytic";

function action(props) {
  return {
    title: "Thống kê tổng quan",
    chunks: ["analytic"],
    component: <Component {...props} />,
  };
}
export default action;
