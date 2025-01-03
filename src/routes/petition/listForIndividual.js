import React from "react";
import Component from "../../pages/petition/listForIndividual"

const title = "Danh sách xử lý";
const chunks = ["list-for-individual"];

function action(props) {
  return {
    title,
    chunks,
    component: <Component {...props} />,
  };
}
export default action;
