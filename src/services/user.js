import axios from "./axios"

export const list = (body = {}) => {
 return axios.post("/admin/user/list", body)
}

export const create = (body = {}) => {
 return axios.post("/admin/user/create", body)
}

export const update = (body = {}) => {
 return axios.post("/admin/user/update", body)
}

export const inactive = (body) => {
 return axios.post("/admin/user/inactive", body)
}
