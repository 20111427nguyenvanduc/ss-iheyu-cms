import axios from "./axios";

export const create = (body = {}) => {
  return axios.post("/admin/petition/create", body);
};

export const list = (body = {}) => {
  return axios.post("/admin/petition/list", body);
};

export const listCategory = (body) => {
  return axios.post("/admin/petition/list-category", body);
};

export const listCommunity = (body) => {
  return axios.post("/admin/petition/list-community", body);
};

export const update = (body = {}) => {
  return axios.post("/admin/petition/update", body);
};

export const get = (body = {}) => {
  return axios.post("/admin/petition/get", body);
};
