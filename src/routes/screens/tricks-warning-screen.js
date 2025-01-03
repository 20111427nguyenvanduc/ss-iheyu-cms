import React from 'react';
import Component from '../../pages/digitalUtilities/screens/tricks-warning-screen';
import _ from 'lodash';
import CONSTANT from '../../const';
const title = CONSTANT.SCREEN_TITLE['tricks-warning-screen'];
const chunks = ['tricks-warning-screen'];

function action(props) {
  return {
    title,
    chunks,
    component: <Component {...props} id={_.get(props, 'params.id')} />,
  };
}
export default action;
