import React from 'react';
import Component from '../../pages/digitalUtilities/screens/traffic-screen';
import _ from 'lodash';
import CONSTANT from '../../const';
const title = CONSTANT.SCREEN_TITLE['traffic-screen'];
const chunks = ['traffic-screen'];

function action(props) {
  return {
    title,
    chunks,
    component: <Component {...props} id={_.get(props, 'params.id')} />,
  };
}
export default action;
