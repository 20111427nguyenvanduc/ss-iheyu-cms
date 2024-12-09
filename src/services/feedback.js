import axios from "./axios"
import CONSTANT from "../const"

export const getListFeedback = (from) => {
 let postData = {
  from: from,
 }

 let url = "/api/feedback/get-list"
 return axios.post(url, postData)
}

export const getFeedbackInf = (jobType, idSource) => {
 let api
 if (jobType === CONSTANT.JOB_TYPE.GENERAL_FEEDBACK) {
  api = "/api/feedback/get-inf"
 } else if (jobType === CONSTANT.JOB_TYPE.ORDER_CANCEL_FEEDBACK) {
  api = "/api/reason-cancel/get-inf"
 } else if (jobType === CONSTANT.JOB_TYPE.REPORT_ORDER_FEEDBACK) {
  api = "/api/report-order/get-inf"
 }
 let postData = {
  id: idSource,
 }
 return axios.post(api, postData)
}

export const getFeedbackByPhone = (phone) => {
 let postData = {
  phone: phone,
 }

 let url = "/api/feedback/search-by-phone"
 return axios.post(url, postData)
}

export const getOrderCancelByPhone = (phone) => {
 let postData = {
  phone: phone,
 }
 let url = "/api/reason-cancel/search-by-phone"

 return axios.post(url, postData)
}

export const getReportOrderByPhone = (phone) => {
 let postData = {
  phone: phone,
 }
 let url = "/api/report-order/search-by-phone"

 return axios.post(url, postData)
}

export const registerFeedback = (recordId, userID) => {
 let postData = {
  id: recordId,
  userId: userID,
 }
 let url = "/api/feedback/register"

 return axios.post(url, postData)
}

export const getListOrderCancel = (from) => {
 let postData = {
  from: from,
 }
 let url = "/api/reason-cancel/get-list"

 return axios.post(url, postData)
}

export const registerOrderCancel = (recordId, userID) => {
 let postData = {
  id: recordId,
  userId: userID,
 }
 let url = "/api/reason-cancel/register"

 return axios.post(url, postData)
}

export const getListReportOrder = (from) => {
 let postData = {
  from: from,
 }
 let url = "/api/report-order/get-list"

 return axios.post(url, postData)
}

export const registerReportOrder = (recordId, userID) => {
 let postData = {
  id: recordId,
  userId: userID,
 }
 let url = "/api/report-order/register"

 return axios.post(url, postData)
}
