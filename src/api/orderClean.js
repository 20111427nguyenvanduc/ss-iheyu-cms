/* jslint es6 */
import fs from "fs"
import _ from "lodash"
import {HEYCLEAN_SERVICE} from "../config.js"
import {apiPost} from "./api"
import {post} from "./job"
import CONSTANT from "../const"

export default {
 listOrderType(req, res) {
  const url = `${HEYCLEAN_SERVICE}/api/v1.0/admin/order-type-list`
  const body = req.body
  apiPost(url, body, (err, result) => {
   res.json(err || result)
  })
 },
 listOrderHeyCare(req, res) {
  const url = `${HEYCLEAN_SERVICE}/api/v1.0/admin/order-list`
  const body = req.body
  apiPost(url, body, (err, result) => {
   res.json(err || result)
  })
 },
 listOrderJobHeyCare(req, res) {
  const url = `${HEYCLEAN_SERVICE}/api/v1.0/admin/job-list`
  const body = req.body
  apiPost(url, body, (err, result) => {
   res.json(err || result)
  })
 },
 detailOrderHeyCare(req, res) {
  const url = `${HEYCLEAN_SERVICE}/api/v1.0/admin/order-detail`
  const body = req.body
  apiPost(url, body, (err, result) => {
   res.json(err || result)
  })
 },
 getOrderCareJobInf(req, res) {
  const url = `${HEYCLEAN_SERVICE}/api/v1.0/admin/job-detail`
  const body = req.body
  apiPost(url, body, (err, result) => {
   res.json(err || result)
  })
 },
 changeStatusOrderHeyCare(req, res) {
  const url = `${HEYCLEAN_SERVICE}/api/v1.0/admin/order-change-status`
  const body = req.body
  apiPost(url, body, (err, result) => {
   res.json(err || result)
  })
 },
 rejectOrderHeyCare(req, res) {
  const url = `${HEYCLEAN_SERVICE}/api/v1.0/admin/order-reject`
  const body = req.body
  apiPost(url, body, (err, result) => {
   res.json(err || result)
  })
 },
 retryOrderHeyCare(req, res) {
  const url = `${HEYCLEAN_SERVICE}/api/v1.0/admin/order-retry`
  const body = req.body
  apiPost(url, body, (err, result) => {
   res.json(err || result)
  })
 },
 rejectJobHeyCare(req, res) {
  const url = `${HEYCLEAN_SERVICE}/api/v1.0/admin/job-reject`
  const body = req.body
  apiPost(url, body, (err, result) => {
   res.json(err || result)
  })
 },
 retryJobHeyCare(req, res) {
  const url = `${HEYCLEAN_SERVICE}/api/v1.0/admin/job-retry`
  const body = req.body
  apiPost(url, body, (err, result) => {
   res.json(err || result)
  })
 },

 assignJobStaff(req, res) {
  const url = `${HEYCLEAN_SERVICE}/api/v1.0/admin/assign-staff`
  const body = req.body
  apiPost(url, body, (err, result) => {
   res.json(err || result)
  })
 },

 switchJobStaff(req, res) {
  const url = `${HEYCLEAN_SERVICE}/api/v1.0/admin/switch-staff`
  const body = req.body
  apiPost(url, body, (err, result) => {
   res.json(err || result)
  })
 },

 switchJobLeader(req, res) {
  const url = `${HEYCLEAN_SERVICE}/api/v1.0/admin/switch-leader`
  const body = req.body
  apiPost(url, body, (err, result) => {
   res.json(err || result)
  })
 },

 orderLog(req, res) {
  let body = req.body
  let url = `${HEYCLEAN_SERVICE}/api/v1.0/admin/order-log`
  apiPost(url, body, (err, result) => {
   res.json(err || result)
  })
 },

 jobLog(req, res) {
  let body = req.body
  let url = `${HEYCLEAN_SERVICE}/api/v1.0/admin/job-log`
  apiPost(url, body, (err, result) => {
   res.json(err || result)
  })
 },

 promoteApprove(req, res) {
  let body = req.body
  let url = `${HEYCLEAN_SERVICE}/api/v1.0/admin/order/promote/approve`
  apiPost(url, body, (err, result) => {
   res.json(err || result)
  })
 },

 promoteReject(req, res) {
  let body = req.body
  let url = `${HEYCLEAN_SERVICE}/api/v1.0/admin/order/promote/reject`
  apiPost(url, body, (err, result) => {
   res.json(err || result)
  })
 },

 jobChangeWorkingTime(req, res) {
  let body = req.body
  let url = `${HEYCLEAN_SERVICE}/api/v1.0/admin/job-change-working-time`
  apiPost(url, body, (err, result) => {
   res.json(err || result)
  })
 },

 pushAllStaffJob(req, res) {
  let body = req.body
  let url = `${HEYCLEAN_SERVICE}/api/v1.0/admin/order/push-all-staff`
  apiPost(url, body, (err, result) => {
   res.json(err || result)
  })
 },

 listOrderRejected(req, res) {
  let body = req.body
  body.userId = req.user._id
  let url = "/api/v1.0/job/order-clean/list-rejected"
  post(body, url, (err, data) => {
   res.json(err || data)
  })
 },

 getOrderCareInf(req, res) {
  let body = req.body
  body.userId = req.user._id
  let url = "/api/v1.0/job/order-clean/get"
  post(body, url, (err, data) => {
   res.json(err || data)
  })
 },

 registerOrderCare(req, res) {
  let body = req.body
  body.userId = req.user._id
  let url = "/api/v1.0/job/order-clean/register"
  post(body, url, (err, data) => {
   res.json(err || data)
  })
 },

 searchByPhoneOrderCare(req, res) {
  let body = req.body
  body.userId = req.user._id
  let url = "/api/v1.0/job/order-clean/find-by-phone"
  post(body, url, (err, data) => {
   res.json(err || data)
  })
 },

 listOrderJobLated(req, res) {
  let body = req.body
  body.userId = req.user._id
  let url = "/api/v1.0/job/order-clean-job/list-lated"
  post(body, url, (err, data) => {
   res.json(err || data)
  })
 },

 listOrderJobNeedContact(req, res) {
  let body = req.body
  body.userId = req.user._id
  let url = "/api/v1.0/job/order-clean-job/list-need-contact"
  post(body, url, (err, data) => {
   res.json(err || data)
  })
 },

 listOrderJobNeedConfirm(req, res) {
  let body = req.body
  body.userId = req.user._id
  let url = "/api/v1.0/job/order-clean-job/list-need-confirm"
  post(body, url, (err, data) => {
   res.json(err || data)
  })
 },

 listOrderJobNeedDone(req, res) {
  let body = req.body
  body.userId = req.user._id
  let url = "/api/v1.0/job/order-clean-job/list-need-done"
  post(body, url, (err, data) => {
   res.json(err || data)
  })
 },

 listOrderJobNeedMoving(req, res) {
  let body = req.body
  body.userId = req.user._id
  let url = "/api/v1.0/job/order-clean-job/list-need-moving"
  post(body, url, (err, data) => {
   res.json(err || data)
  })
 },

 registerOrderCareJob(req, res) {
  let body = req.body
  body.userId = req.user._id
  let url = "/api/v1.0/job/order-clean-job/register"
  post(body, url, (err, data) => {
   res.json(err || data)
  })
 },

 searchByPhoneOrderCareJob(req, res) {
  let body = req.body
  body.userId = req.user._id
  let url = "/api/v1.0/job/order-clean-job/find-by-phone"
  post(body, url, (err, data) => {
   res.json(err || data)
  })
 },

 listJobNeedTraining(req, res) {
  let body = req.body
  body.userId = req.user._id
  let url = "/api/v1.0/job/order-clean-job/list-need-training"
  post(body, url, (err, data) => {
   res.json(err || data)
  })
 },
}
