import React from "react";
import Component from "../../pages/groupPermissionDetail";

const title = "Nhóm quyền";
const chunks = ["group-permission-detail"];

function action(props) {
  return {
    title,
    chunks,
    component: <Component {...props} id={_.get(props, "params.id")}/>,
  };
}
export default action;
