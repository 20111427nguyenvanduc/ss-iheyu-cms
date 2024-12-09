import axios from "./axios"

export const orderTypeList = (body = {}) => {
 return axios.post("/api/order-type-care/list", body)
}

export const list = (body = {}) => {
 return axios.post("/api/order/list", body)
}

export const listJob = (body = {}) => {
 return axios.post("/api/order-job/list", body)
}

export const detail = (body = {}) => {
 return axios.post("/api/order/detail", body)
}

export const changeStatus = (body = {}) => {
 return axios.post("/api/order/change-status", body)
}

export const reject = (body = {}) => {
 return axios.post("/api/order/reject", body)
}

export const retry = (body = {}) => {
 return axios.post("/api/order/retry", body)
}

export const rejectJob = (body = {}) => {
 return axios.post("/api/order-job/reject", body)
}

export const retryJob = (body = {}) => {
 return axios.post("/api/order-job/retry", body)
}

export const assignJob = (body = {}) => {
 return axios.post("/api/order-job/assign", body)
}

export const switchJob = (body = {}) => {
 return axios.post("/api/order-job/switch", body)
}

export const listOrderRejected = (body = {}) => {
 return axios.post("/api/order/list-rejected", body)
}

export const getOrderCareInf = (body = {}) => {
 return axios.post("/api/order/job-inf", body)
}

export const registerOrderCare = (body = {}) => {
 return axios.post("/api/order/register", body)
}

export const searchByPhoneOrderCare = (body = {}) => {
 return axios.post("/api/order/search-by-phone", body)
}

export const listOrderJobLated = (body = {}) => {
 return axios.post("/api/order-job/list-lated", body)
}

export const listOrderJobNeedContact = (body = {}) => {
 return axios.post("/api/order-job/list-need-contact", body)
}
export const listOrderJobNeedConfirm = (body = {}) => {
 return axios.post("/api/order-job/list-need-confirm", body)
}
export const listOrderJobNeedDone = (body = {}) => {
 return axios.post("/api/order-job/list-need-done", body)
}
export const listOrderJobNeedMoving = (body = {}) => {
 return axios.post("/api/order-job/list-need-moving", body)
}
export const listOrderJobNeedTraining = (body = {}) => {
 return axios.post("/api/order-job/list-need-training", body)
}

export const getOrderCareJobInf = (body = {}) => {
 return axios.post("/api/order-job/job-inf", body)
}

export const registerOrderCareJob = (body = {}) => {
 return axios.post("/api/order-job/register", body)
}

export const searchByPhoneOrderCareJob = (body = {}) => {
 return axios.post("/api/order-job/search-by-phone", body)
}

export const orderLog = (body = {}) => {
 return axios.post("/api/order/log", body)
}

export const jobLog = (body = {}) => {
 return axios.post("/api/order-job/log", body)
}
