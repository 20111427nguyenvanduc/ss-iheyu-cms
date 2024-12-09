import axios from "./axios"

export const list = (body = {}) => {
 return axios.post("/api/price-increase-clean/list", body)
}

export const create = (body = {}) => {
 return axios.post("/api/price-increase-clean/create", body)
}

export const update = (body = {}) => {
 return axios.post("/api/price-increase-clean/update", body)
}

export const deletePrice = (body = {}) => {
 return axios.post("/api/price-increase-clean/delete", body)
}
