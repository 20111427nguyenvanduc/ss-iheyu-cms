/*jslint es6 */
import fs from "fs"
import request from "request"
import {changeAlias} from "../components/helps.js"
import {API_URL, ORDERS_URL, NEW_JOB_URL, MEDIA_URL} from "../config.js"
const callApi = (url, postData) => {
 return new Promise()
}
export default {
 staffDonePromoteHeycareList(req, res) {
  let {body} = req
  body.userId = req.user._id
  const url = "/api/v1.0/job/staff-done-promote-heycare/list"
  post(body, url, (err, data) => {
   res.json(err || data)
  })
 },

 staffDonePromoteHeycareRegister(req, res) {
  let {body} = req
  body.userId = req.user._id
  const url = "/api/v1.0/job/staff-done-promote-heycare/register"
  post(body, url, (err, data) => {
   res.json(err || data)
  })
 },

 staffDonePromoteHeycareGet(req, res) {
  let {body} = req
  body.userId = req.user._id
  const url = "/api/v1.0/job/staff-done-promote-heycare/get"
  post(body, url, (err, data) => {
   res.json(err || data)
  })
 },

 staffDonePromoteHeycareFindByPhone(req, res) {
  let {body} = req
  body.userId = req.user._id
  const url = "/api/v1.0/job/staff-done-promote-heycare/find-by-phone"
  post(body, url, (err, data) => {
   res.json(err || data)
  })
 },

 staffDonePromoteCleanList(req, res) {
  let {body} = req
  body.userId = req.user._id
  const url = "/api/v1.0/job/staff-done-promote-clean/list"
  post(body, url, (err, data) => {
   res.json(err || data)
  })
 },

 staffDonePromoteCleanRegister(req, res) {
  let {body} = req
  body.userId = req.user._id
  const url = "/api/v1.0/job/staff-done-promote-clean/register"
  post(body, url, (err, data) => {
   res.json(err || data)
  })
 },

 staffDonePromoteCleanGet(req, res) {
  let {body} = req
  body.userId = req.user._id
  const url = "/api/v1.0/job/staff-done-promote-clean/get"
  post(body, url, (err, data) => {
   res.json(err || data)
  })
 },

 staffDonePromoteCleanFindByPhone(req, res) {
  let {body} = req
  body.userId = req.user._id
  const url = "/api/v1.0/job/staff-done-promote-clean/find-by-phone"
  post(body, url, (err, data) => {
   res.json(err || data)
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
