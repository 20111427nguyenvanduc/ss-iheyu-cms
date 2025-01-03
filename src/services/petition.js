import axios from "./axios"

export const list = (body = {}) => {
 return axios.post("/admin/petition/list", body)
}

export const listForIndividual = (body = {}) => {
 return axios.post("/admin/petition/list-for-individual", body)
}

export const count = (body = {}) => {
 return axios.post("/admin/petition/count", body)
}

export const countForIndividual = (body = {}) => {
 return axios.post("/admin/petition/count-for-individual", body)
}

export const get = (body = {}) => {
 return axios.post("/admin/petition/get", body)
}

export const getLogJob = (body = {}) => {
 return axios.post("/admin/petition/get-log-job", body)
}

export const tiepNhanXyLy = (body = {}) => {
 return axios.post("/admin/petition/tiep-nhan-xu-ly", body)
}

export const chuyenXyLy = (body = {}) => {
 return axios.post("/admin/petition/chuyen-xu-ly", body)
}

export const getUserByUnit = (body = {}) => {
 return axios.post("/admin/petition/get-user-by-unit", body)
}

export const getUnitChildren = (body = {}) => {
 return axios.post("/admin/petition/get-unit-children", body)
}
