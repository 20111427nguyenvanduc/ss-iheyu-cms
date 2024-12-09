import axios from "./axios"

export const list = (body = {}) => {
 return axios.post("/api/price-increase-care/list", body)
}

export const create = (body = {}) => {
 return axios.post("/api/price-increase-care/create", body)
}

export const update = (body = {}) => {
 return axios.post("/api/price-increase-care/update", body)
}

export const deletePrice = (body = {}) => {
 return axios.post("/api/price-increase-care/delete", body)
}
