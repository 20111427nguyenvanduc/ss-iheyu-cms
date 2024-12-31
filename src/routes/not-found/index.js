import React from "react";
import NotFound from "../../pages/notFound";

function action(props) {
  return {
    title: "Không tìm thấy trang",
    chunks: ["not-found"],
    component: <NotFound {...props} />,
  };
}
export default action;
