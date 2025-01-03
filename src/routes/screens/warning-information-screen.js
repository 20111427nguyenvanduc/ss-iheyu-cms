import React from 'react';
import Component from '../../pages/digitalUtilities/screens/warning-information-screen';
import _ from 'lodash';
import CONSTANT from '../../const';
const title = CONSTANT.SCREEN_TITLE['warning-information-screen'];
const chunks = ['warning-information-screen'];

function action(props) {
  return {
    title,
    chunks,
    component: <Component {...props} id={_.get(props, 'params.id')} />,
  };
}
export default action;
