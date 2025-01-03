import React from 'react';
import Component from '../../../pages/digitalUtilities/screens/administrative-agency-screen';
import _ from 'lodash';

const title = 'Y Tế';
const chunks = ['administrative-agency-screen'];

function action(props) {
  return {
    title,
    chunks,
    component: <Component {...props} id={_.get(props, 'params.id')} />,
  };
}
export default action;
