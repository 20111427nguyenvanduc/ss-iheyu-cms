import axios from "./axios"

export const list = (body = {}) => {
 return axios.post("/api/partner/list", body)
}

export const add = (body = {}) => {
 return axios.post("/api/partner/add", body)
}

export const modify = (body = {}) => {
 return axios.post("/api/partner/modify", body)
}

export const inactive = (body = {}) => {
 return axios.post("/api/partner/inactive", body)
}
