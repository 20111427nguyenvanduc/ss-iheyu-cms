import React from 'react';
import Component from '../../pages/digitalUtilities/screens/travel-list-screen';
import _ from 'lodash';
import CONSTANT from '../../const';
const title = CONSTANT.SCREEN_TITLE['travel-list-screen'];
const chunks = ['travel-list-screen'];

function action(props) {
  return {
    title,
    chunks,
    component: <Component {...props} id={_.get(props, 'params.id')} />,
  };
}
export default action;
