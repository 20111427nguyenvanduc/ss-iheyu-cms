import axios from "./axios"

export const list = (body = {}) => {
 return axios.post("/api/user/list", body)
}
export const read = (body = {}) => {
 return axios.post("/api/user/read", body)
}
export const create = (body = {}) => {
 return axios.post("/api/user/create", body)
}
export const update = (body = {}) => {
 return axios.post("/api/user/update", body)
}
export const active = (body = {}) => {
 return axios.post("/api/user/active", body)
}
