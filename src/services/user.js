import axios from "./axios";

export const list = (body = {}) => {
  return axios.post("/admin/user/list", body);
};

export const create = (body = {}) => {
  return axios.post("/admin/user/create", body);
};

export const update = (body = {}) => {
  return axios.post("/admin/user/update", body);
};

export const inactive = (body) => {
  return axios.post("/admin/user/inactive", body);
};
export const get = (body) => {
  return axios.post("/admin/user/get", body);
};

export const grantPermisstion = (body) => {
  return axios.post("/admin/user/grant-permisstion", body);
};
