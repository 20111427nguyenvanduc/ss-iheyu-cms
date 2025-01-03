import React from 'react';
import Component from '../../pages/digitalUtilities';

function action(props) {
  return {
    title: 'Tiện ích',
    chunks: ['app-manager'],
    component: <Component {...props} />,
  };
}
export default action;
