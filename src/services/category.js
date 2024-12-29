import axios from "./axios"

export const list = (body = {}) => {
 return axios.post("/admin/category/list", body)
}

export const create = (body = {}) => {
 return axios.post("/admin/category/create", body)
}

export const update = (body = {}) => {
 return axios.post("/admin/category/update", body)
}

export const inactive = (body) => {
 return axios.post("/admin/category/inactive", body)
}
