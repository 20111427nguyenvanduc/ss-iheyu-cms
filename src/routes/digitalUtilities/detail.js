import React from "react";
import Component from "../../pages/digitalUtilities/detail";
import _ from "lodash";

const title = "Tiện ích số";
const chunks = ["digital-utilities-detail"];

function action(props) {
  return {
    title,
    chunks,
    component: <Component {...props} id={_.get(props, "params.id")} />,
  };
}
export default action;
