import axios from './axios';

export const listCategory = (body = {}) => {
  return axios.post('/admin/services/list-category', body);
};

export const listService = (body = {}) => {
  return axios.post('/admin/services/list', body);
};

export const listServiceChildren = (body = {}) => {
  return axios.post('/admin/services/list-service-children', body);
};
export const hideShowService = (body = {}) => {
  return axios.post('/admin/services/hide-show', body);
};
export const orderingService = (body = {}) => {
  return axios.post('/admin/services/ordering', body);
};
export const updateIconService = (body = {}) => {
  return axios.post('/admin/services/update-icon', body);
};
