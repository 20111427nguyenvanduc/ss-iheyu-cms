import axios from "./axios"

export const list = (body = {}) => {
 return axios.post("/admin/group-permission/list", body)
}

export const create = (body = {}) => {
 return axios.post("/admin/group-permission/create", body)
}

export const update = (body = {}) => {
 return axios.post("/admin/group-permission/update", body)
}

export const logout = (body = {}) => {
 return axios.post("/admin/group-permission/list", body)
}

export const inactive = (body) => {
 return axios.post("/admin/group-permission/inactive", body)
}
