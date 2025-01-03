import React from 'react';
import Component from '../../pages/digitalUtilities/detail';
import _ from 'lodash';

const title = 'Tiện ích số';
const chunks = ['app-manager-detail-children'];

function action(props) {
  return {
    title,
    chunks,
    component: <Component {...props} serviceCategory={_.get(props, 'params.service')} />,
  };
}
export default action;
