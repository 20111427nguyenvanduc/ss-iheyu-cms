import React from "react";
import Component from "../../pages/groupPermission";

const title = "Nhóm quyền";
const chunks = ["group-permission"];

function action(props) {
  return {
    title,
    chunks,
    component: <Component {...props} />,
  };
}
export default action;
