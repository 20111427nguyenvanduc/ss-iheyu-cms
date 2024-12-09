/*jslint es6 */
import fs from "fs"
import request from "request"
import { changeAlias } from "../components/helps"
import { API_URL, ORDERS_URL, NEW_JOB_URL, MEDIA_URL } from "../config.js"
const callApi = (url, postData) => {
 return new Promise()
}
export default {
 getRegistedList(req, res) {
  let { body } = req
  body.userId = req.user._id
  const url = "/api/v1.0/job/action/list"
  post(body, url, (err, data) => {
   res.json(err || data)
  })
 },

 createJob(req, res) {
  let { body } = req
  body.userId = req.user._id
  const url = "/api/v1.0/job/action/create"
  post(body, url, (err, data) => {
   res.json(err || data)
  })
 },

 registerJob(req, res) {
  let { body } = req
  body.userId = req.user._id
  const url = "/api/v1.0/job/action/register"
  post(body, url, (err, data) => {
   res.json(err || data)
  })
 },

 getJobInf(req, res) {
  let { body } = req
  body.userId = req.user._id
  const url = "/api/v1.0/job/action/get"
  post(body, url, (err, data) => {
   res.json(err || data)
  })
 },

 noteJob(req, res) {
  let { body } = req
  body.userId = req.user._id
  const url = "/api/v1.0/job/action/note"
  post(body, url, (err, data) => {
   res.json(err || data)
  })
 },

 doneJob(req, res) {
  let { body } = req
  body.userId = req.user._id
  const url = "/api/v1.0/job/action/done"
  post(body, url, (err, data) => {
   res.json(err || data)
  })
 },

 releaseJob(req, res) {
  let { body } = req
  body.userId = req.user._id
  const url = "/api/v1.0/job/action/release"
  post(body, url, (err, data) => {
   res.json(err || data)
  })
 },

 pendingJob(req, res) {
  let { body } = req
  body.userId = req.user._id
  const url = "/api/v1.0/job/action/pending"
  post(body, url, (err, data) => {
   res.json(err || data)
  })
 },

 processJob(req, res) {
  let { body } = req
  body.userId = req.user._id
  const url = "/api/v1.0/job/action/process"
  post(body, url, (err, data) => {
   res.json(err || data)
  })
 },

 getLogJob(req, res) {
  let { body } = req
  body.userId = req.user._id
  const url = "/api/v1.0/job/action/get-log"
  post(body, url, (err, data) => {
   res.json(err || data)
  })
 },

 transferJob(req, res) {
  let { body } = req
  body.userId = req.user._id
  const url = "/api/v1.0/job/action/transfer"
  post(body, url, (err, data) => {
   res.json(err || data)
  })
 },

 saveResultJob(req, res) {
  let { body } = req
  body.userId = req.user._id
  const url = "/api/v1.0/job/action/save-result"
  post(body, url, (err, data) => {
   res.json(err || data)
  })
 },

 statistics(req, res) {
  let { body } = req
  body.userId = req.user._id
  const url = "/api/v1.0/job/action/statistics"
  post(body, url, (err, data) => {
   res.json(err || data)
  })
 },

 getListUsers(req, res) {
  let { type, departments, active = 1 } = req.body
  let query = {
   type,
   departments,
   active,
  }
  UsersRead.find(query, (err, admins) => {
   if (err)
    return res.json({
     code: 300,
    })
   res.json({
    code: 200,
    users: admins,
   })
  })
 },
}

export const post = (body, url, cb) => {
 let options = {
  url: NEW_JOB_URL + url,
  method: "POST",
  strictSSL: false,
  headers: {
   "content-type": "application/json",
  },
  body: JSON.stringify(body),
 }
 request(options, (error, response, body) => {
  let bodyData = body ? JSON.parse(body) : body
  if (error) {
   cb({
    code: 300,
    message: error.message || "Có lỗi xảy ra vui lòng thử lại sau",
   })
  } else {
   cb(null, bodyData)
  }
 })
}
