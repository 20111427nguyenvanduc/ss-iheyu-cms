import React from "react";
import Component from "../../pages/userManager"

function action(props) {
  return {
    title: "Danh sách cán bộ",
    chunks: ["user-manager"],
    component: <Component {...props} />,
  };
}
export default action;


