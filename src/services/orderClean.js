import axios from "./axios"

export const orderTypeList = (body = {}) => {
 return axios.post("/api/order-type-clean/list", body)
}

export const list = (body = {}) => {
 return axios.post("/api/order-clean/list", body)
}

export const listJob = (body = {}) => {
 return axios.post("/api/order-clean-job/list", body)
}

export const detail = (body = {}) => {
 return axios.post("/api/order-clean/detail", body)
}

export const changeStatus = (body = {}) => {
 return axios.post("/api/order-clean/change-status", body)
}

export const reject = (body = {}) => {
 return axios.post("/api/order-clean/reject", body)
}

export const retry = (body = {}) => {
 return axios.post("/api/order-clean/retry", body)
}

export const rejectJob = (body = {}) => {
 return axios.post("/api/order-clean-job/reject", body)
}

export const retryJob = (body = {}) => {
 return axios.post("/api/order-clean-job/retry", body)
}

export const assignJob = (body = {}) => {
 return axios.post("/api/order-clean-job/assign", body)
}

export const switchJob = (body = {}) => {
 return axios.post("/api/order-clean-job/switch", body)
}

export const listOrderRejected = (body = {}) => {
 return axios.post("/api/order-clean/list-rejected", body)
}

export const getOrderCareInf = (body = {}) => {
 return axios.post("/api/order-clean/job-inf", body)
}

export const registerOrderCare = (body = {}) => {
 return axios.post("/api/order-clean/register", body)
}

export const searchByPhoneOrderCare = (body = {}) => {
 return axios.post("/api/order-clean/search-by-phone", body)
}

export const listOrderJobLated = (body = {}) => {
 return axios.post("/api/order-clean-job/list-lated", body)
}

export const listOrderJobNeedContact = (body = {}) => {
 return axios.post("/api/order-clean-job/list-need-contact", body)
}
export const listOrderJobNeedConfirm = (body = {}) => {
 return axios.post("/api/order-clean-job/list-need-confirm", body)
}
export const listOrderJobNeedDone = (body = {}) => {
 return axios.post("/api/order-clean-job/list-need-done", body)
}
export const listOrderJobNeedMoving = (body = {}) => {
 return axios.post("/api/order-clean-job/list-need-moving", body)
}
export const listOrderJobNeedTraining = (body = {}) => {
 return axios.post("/api/order-clean-job/list-need-training", body)
}

export const getOrderCareJobInf = (body = {}) => {
 return axios.post("/api/order-clean-job/job-inf", body)
}

export const registerOrderCareJob = (body = {}) => {
 return axios.post("/api/order-clean-job/register", body)
}

export const searchByPhoneOrderCareJob = (body = {}) => {
 return axios.post("/api/order-clean-job/search-by-phone", body)
}

export const orderLog = (body = {}) => {
 return axios.post("/api/order-clean/log", body)
}

export const jobLog = (body = {}) => {
 return axios.post("/api/order-clean-job/log", body)
}

export const switchLeader = (body = {}) => {
 return axios.post("/api/order-clean-job/switch-leader", body)
}

export const jobChangeWorkingTime = (body = {}) => {
 return axios.post("/api/admin/job-change-working-time", body)
}

export const pushAllStaffJob = (body = {}) => {
 return axios.post("/api/admin/order-push-all-staff", body)
}
