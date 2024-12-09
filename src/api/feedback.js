/*jslint es6 */
import request from "request"
import { post } from "./job"
import { apiPost } from "./api"
import { HEYCARE_SERVICE } from "../config"
export default {
 getFeedback(req, res) {
  let body = req.body
  body.userId = req.user._id
  let url = "/api/v1.0/job/feedback/list-heycare"
  post(body, url, (err, data) => {
   res.json(err || data)
  })
 },

 getFeedbackInf(req, res) {
  let body = req.body
  body.userId = req.user._id
  let url = "/api/v1.0/job/feedback/get"
  post(body, url, (err, data) => {
   res.json(err || data)
  })
 },

 registerFeedback(req, res) {
  let body = req.body
  body.userId = req.user._id
  let url = "/api/v1.0/job/feedback/register"
  post(body, url, (err, data) => {
   res.json(err || data)
  })
 },

 searchByPhoneFeedback(req, res) {
  let body = req.body
  body.userId = req.user._id
  let url = "/api/v1.0/job/feedback/find-by-phone"
  post(body, url, (err, data) => {
   res.json(err || data)
  })
 },

 getRating(req, res) {
  let body = req.body
  body.userId = req.user._id
  let url = "/api/v1.0/job/rating-heycare/list"
  post(body, url, (err, data) => {
   res.json(err || data)
  })
 },

 getRatingInf(req, res) {
  let body = req.body
  body.userId = req.user._id
  let url = "/api/v1.0/job/rating-heycare/get"
  post(body, url, (err, data) => {
   res.json(err || data)
  })
 },

 registerRating(req, res) {
  let body = req.body
  body.userId = req.user._id
  let url = "/api/v1.0/job/rating-heycare/register"
  post(body, url, (err, data) => {
   res.json(err || data)
  })
 },

 searchByPhoneRating(req, res) {
  let body = req.body
  body.userId = req.user._id
  let url = "/api/v1.0/job/rating-heycare/find-by-phone"
  post(body, url, (err, data) => {
   res.json(err || data)
  })
 },

 ratingStar(req, res) {
  const url = `${HEYCARE_SERVICE}/api/v1.0/admin/rating-star`
  const body = req.body
  apiPost(url, body, (err, result) => {
   res.json(err || result)
  })
 },
}
