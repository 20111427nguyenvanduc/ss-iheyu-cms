import React from 'react';
import Component from '../../pages/digitalUtilities/screens/environmental-resources-screen';
import _ from 'lodash';
import CONSTANT from '../../const';
const title = CONSTANT.SCREEN_TITLE['environmental-resources-screen'];
const chunks = ['environmental-resources-screen'];

function action(props) {
  return {
    title,
    chunks,
    component: <Component {...props} id={_.get(props, 'params.id')} />,
  };
}
export default action;
