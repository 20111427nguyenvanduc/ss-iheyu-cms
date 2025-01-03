import React from 'react';
import Component from '../../pages/digitalUtilities/screens/errands-order-create-screen';
import _ from 'lodash';
import CONSTANT from '../../const';
const title = CONSTANT.SCREEN_TITLE['errands-order-create-screen'];
const chunks = ['errands-order-create-screen'];

function action(props) {
  return {
    title,
    chunks,
    component: <Component {...props} id={_.get(props, 'params.id')} />,
  };
}
export default action;
