import axios from "./axios"

export const list = (body = {}) => {
 return axios.post("/api/hospital/list", body)
}

export const add = (body = {}) => {
 return axios.post("/api/hospital/add", body)
}

export const modify = (body = {}) => {
 return axios.post("/api/hospital/modify", body)
}

export const inactive = (body = {}) => {
 return axios.post("/api/hospital/inactive", body)
}
