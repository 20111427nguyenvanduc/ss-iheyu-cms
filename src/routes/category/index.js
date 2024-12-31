import React from "react";
import Component from "../../pages/category";

function action(props) {
  return {
    title: "Danh mục phản ánh",
    chunks: ["category"],
    component: <Component {...props} />,
  };
}
export default action;
