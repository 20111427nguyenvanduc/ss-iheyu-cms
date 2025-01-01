import React from "react";
import Component from "../../pages/positionDetail"

const title = "Chi tiết chức vụ"
const chunks = ["position-detail"];

function action(props) {
  return {
    title,
    chunks,
    component: <Component {...props}  id={_.get(props, "params.id")}/>,
  };
}
export default action;


