import axios from "./axios"

export const getListJob = (type, status, limit, page, phone, sort) => {
 let postData = {
  type: type,
  status: status,
  limit: limit,
  page: page,
  phone: phone,
  sort: sort,
 }

 let url = "/api/job/get-list"

 return axios.post(url, postData)
}

export const noteJob = (id, mess, images) => {
 let postData = {
  id: id,
  message: mess,
  images: images,
 }

 let url = "/api/job/note"

 return axios.post(url, postData)
}

export const createJob = (phone, content) => {
 let postData = {
  phone: phone,
  content: content,
 }

 let url = "/api/job/create"

 return axios.post(url, postData)
}

export const registerJob = (id) => {
 let postData = {
  id: id,
 }

 let url = "/api/job/register"

 return axios.post(url, postData)
}

export const getJob = (id) => {
 let postData = {
  id: id,
 }

 let url = "/api/job/get"

 return axios.post(url, postData)
}

export const doneJob = (id) => {
 let postData = {
  id: id,
 }

 let url = "/api/job/done"

 return axios.post(url, postData)
}

export const releaseJob = (id, time) => {
 let postData = {
  id: id,
  time: time,
 }

 let url = "/api/job/release"

 return axios.post(url, postData)
}

export const pendingJob = (id, time, userId) => {
 let postData = {
  id: id,
  time: time,
  userId: userId,
 }

 let url = "/api/job/pending"

 return axios.post(url, postData)
}

export const processJob = (id, supporterId) => {
 let postData = {
  id: id,
  userId: supporterId,
 }

 let url = "/api/job/process"

 return axios.post(url, postData)
}

export const getLogJob = (id) => {
 let postData = {
  id: id,
 }

 let url = "/api/job/get-log"

 return axios.post(url, postData)
}

export const transferJob = (id, supporter, supporterTake) => {
 let postData = {
  id: id,
  userId: supporter,
  userIdReceiveJob: supporterTake,
 }

 let url = "/api/job/transfer"

 return axios.post(url, postData)
}

export const getAllUsers = (body = {}) => {
 let url = "/api/job/get-all-users"
 return axios.post(url, body)
}

export const saveResultJob = (id, result) => {
 let postData = {
  id: id,
  result: result,
 }
 let url = "/api/job/save-result"
 return axios.post(url, postData)
}
