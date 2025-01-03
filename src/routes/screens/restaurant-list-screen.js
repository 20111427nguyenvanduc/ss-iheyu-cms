import React from 'react';
import Component from '../../pages/digitalUtilities/screens/restaurant-list-screen';
import _ from 'lodash';
import CONSTANT from '../../const';
const title = CONSTANT.SCREEN_TITLE['restaurant-list-screen'];
const chunks = ['restaurant-list-screen'];

function action(props) {
  return {
    title,
    chunks,
    component: <Component {...props} id={_.get(props, 'params.id')} />,
  };
}
export default action;
