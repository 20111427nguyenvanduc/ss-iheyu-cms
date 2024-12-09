import axios from "./axios"

export const listPromoteCare = (body = {}) => {
 return axios.post("/api/staff-done-promote-heycare/list", body)
}

export const registerPromoteCare = (body = {}) => {
 return axios.post("/api/staff-done-promote-heycare/register", body)
}

export const getPromoteCare = (body = {}) => {
 return axios.post("/api/staff-done-promote-heycare/get", body)
}

export const findByPhonePromoteCare = (body = {}) => {
 return axios.post("/api/staff-done-promote-heycare/find-by-phone", body)
}

export const listPromoteClean = (body = {}) => {
 return axios.post("/api/staff-done-promote-clean/list", body)
}

export const registerPromoteClean = (body = {}) => {
 return axios.post("/api/staff-done-promote-clean/register", body)
}

export const getPromoteClean = (body = {}) => {
 return axios.post("/api/staff-done-promote-clean/get", body)
}

export const findByPhonePromoteClean = (body = {}) => {
 return axios.post("/api/staff-done-promote-clean/find-by-phone", body)
}

export const promoteApproveClean = (body = {}) => {
 return axios.post("/api/order-clean-job/promote-approve", body)
}

export const promoteRejectClean = (body = {}) => {
 return axios.post("/api/order-clean-job/promote-reject", body)
}

export const promoteApproveCare = (body = {}) => {
 return axios.post("/api/order-job/promote-approve", body)
}

export const promoteRejectCare = (body = {}) => {
 return axios.post("/api/order-job/promote-reject", body)
}
