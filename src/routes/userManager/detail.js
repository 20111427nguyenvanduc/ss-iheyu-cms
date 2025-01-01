import React from "react";
import Component from "../../pages/userManager/detail"

const title = "Hồ sơ tài khoản";
const chunks = ["user-manager-detail"];

function action(props) {
  return {
    title,
    chunks,
    component: <Component {...props}  id={_.get(props, "params.id")}/>,
  };
}
export default action;

