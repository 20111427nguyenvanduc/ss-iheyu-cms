import React from "react";
import Component from "../../pages/unit"

function action(props) {
  return {
    title: "Quản lý đơn vị",
    chunks: ["unit"],
    component: <Component {...props} />,
  };
}
export default action;


