import React from "react";
import Component from "../../pages/permissions";

const title = "Quyền chức năng";
const chunks = ["permissions"];

function action(props) {
  return {
    title,
    chunks,
    component: <Component {...props} />,
  };
}
export default action;
