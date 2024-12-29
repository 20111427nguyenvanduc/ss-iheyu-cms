import axios from "./axios"

export const list = (body = {}) => {
 return axios.post("/admin/permission/list", body)
}

export const create = (body = {}) => {
 return axios.post("/admin/permission/create", body)
}

export const update = (body = {}) => {
 return axios.post("/admin/permission/update", body)
}

export const inactive = (body) => {
 return axios.post("/admin/permission/inactive", body)
}
