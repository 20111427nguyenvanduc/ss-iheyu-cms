import axios from "./axios"

export const list = (body = {}) => {
 return axios.post("/api/member/list", body)
}

export const authen = (body = {}) => {
 return axios.post("/api/member/authen", body)
}

export const openTraining = (body = {}) => {
 return axios.post("/api/member/open-training", body)
}

export const blockMember = (body = {}) => {
 return axios.post("/api/member/block-member", body)
}

export const unblockMember = (body = {}) => {
 return axios.post("/api/member/unblock-member", body)
}

export const chargeMember = (body = {}) => {
 return axios.post("/api/member/charge-member", body)
}

export const chargeLog = (body = {}) => {
 return axios.post("/api/member/charge-log", body)
}

export const chargeLogAnalytic = (body = {}) => {
 return axios.post("/api/member/charge-log-analytic", body)
}

export const getStaffNearest = (body = {}) => {
 return axios.post("/api/staff/get-nearest", body)
}

export const getStaffValid = (body = {}) => {
 return axios.post("/api/staff/get-valid", body)
}

export const saveLog = (body = {}) => {
 return axios.post("/api/members/member-log-create", body)
}

export const listLogs = (body = {}) => {
 return axios.post("/api/members/member-log-list", body)
}
