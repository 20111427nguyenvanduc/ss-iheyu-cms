import axios from "./axios"

export const list = (body = {}) => {
 return axios.post("/admin/role/list", body)
}

export const create = (body = {}) => {
 return axios.post("/admin/role/create", body)
}

export const update = (body = {}) => {
 return axios.post("/admin/role/update", body)
}

export const inactive = (body) => {
 return axios.post("/admin/role/inactive", body)
}
