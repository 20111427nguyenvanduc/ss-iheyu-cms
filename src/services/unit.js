import axios from "./axios"

export const list = (body = {}) => {
 return axios.post("/admin/unit/list", body)
}

export const create = (body = {}) => {
 return axios.post("/admin/unit/create", body)
}

export const update = (body = {}) => {
 return axios.post("/admin/unit/update", body)
}

export const logout = (body = {}) => {
 return axios.post("/admin/unit/list", body)
}

export const inactive = (body) => {
 return axios.post("/admin/unit/inactive", body)
}

export const listLevel = (body) => {
 return axios.post("/admin/unit/list-level", body)
}
