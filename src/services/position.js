import axios from "./axios"

export const list = (body = {}) => {
 return axios.post("/admin/position/list", body)
}

export const create = (body = {}) => {
 return axios.post("/admin/position/create", body)
}

export const update = (body = {}) => {
 return axios.post("/admin/position/update", body)
}

export const inactive = (body) => {
 return axios.post("/admin/position/inactive", body)
}

export const get = (body) => {
 return axios.post("/admin/position/get", body)
}
