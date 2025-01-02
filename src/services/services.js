import axios from "./axios";

export const listCategory = (body = {}) => {
  return axios.post("/admin/services/list-category", body);
};

export const listService = (body = {}) => {
  return axios.post("/admin/services/list", body);
};

export const listServiceChildren = (body = {}) => {
  return axios.post("/admin/services/list-service-children", body);
};
