import React from "react";
import Component from "../../pages/petition"

function action(props) {
  return {
    title: "Danh sách phản ánh",
    chunks: ["petition"],
    component: <Component {...props} />,
  };
}
export default action;

