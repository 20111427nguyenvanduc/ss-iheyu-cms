import React from "react";
import Component from "../../pages/petition/process"

const title = "Xử lý phản ánh";
const chunks = ["petition-process"];

function action(props) {
  return {
    title,
    chunks,
    component: <Component {...props} />,
  };
}
export default action;
