import React from 'react';
import Login from './Login';
const title = 'Đăng nhập';
export default {
  path: '/login',
  action() {
    return {
      title,
      component: <Login title={title} />,
    };
  },

};
