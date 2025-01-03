import React from "react";
import Component from "../../pages/petition/list"

function action(props) {
  return {
    title: "Danh sách phản ánh",
    chunks: ["list-petition"],
    component: <Component {...props} />,
  };
}
export default action;

