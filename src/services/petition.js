import axios from "./axios"

export const create = (body = {}) => {
 return axios.post("/petition/create", body)
}

export const list = (body = {}) => {
 return axios.post("/petition/list", body)
}

export const listCategory = (body) => {
 return axios.post("/petition/list-category", body)
}

export const listCommunity = (body) => {
 return axios.post("/petition/list-community", body)
}

export const update = (body = {}) => {
 return axios.post("/petition/update", body)
}

export const get = (body = {}) => {
 return axios.post("/petition/get", body)
}
