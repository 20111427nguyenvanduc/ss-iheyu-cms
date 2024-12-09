import axios from "./axios"

export const createMember = (body = {}) => {
 return axios.post("/api/admins/create-member", body)
}

export const create = (body = {}) => {
 return axios.post("/api/admins/create", body)
}

export const read = (body = {}) => {
 return axios.post("/api/admins/read", body)
}

export const update = (body = {}) => {
 return axios.post("/api/admins/update", body)
}

export const switchActive = (body = {}) => {
 return axios.post("/api/admins/switch-active", body)
}

export const getPromoteInfByPhone = (body = {}) => {
 return axios.post("/api/promote/get-phone-inf-promote", body)
}
