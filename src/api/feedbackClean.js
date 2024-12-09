/*jslint es6 */
import request from "request"
import { post } from "./job"
import { apiPost } from "./api"
import { HEYCARE_CLEAN } from "../config"
export default {
 getFeedback(req, res) {
  let body = req.body
  body.userId = req.user._id
  let url = "/api/v1.0/job/feedback/list-heyclean"
  post(body, url, (err, data) => {
   res.json(err || data)
  })
 },

 getRating(req, res) {
  let body = req.body
  body.userId = req.user._id
  let url = "/api/v1.0/job/rating-heyclean/list"
  post(body, url, (err, data) => {
   res.json(err || data)
  })
 },

 getRatingInf(req, res) {
  let body = req.body
  body.userId = req.user._id
  let url = "/api/v1.0/job/rating-heyclean/get"
  post(body, url, (err, data) => {
   res.json(err || data)
  })
 },

 registerRating(req, res) {
  let body = req.body
  body.userId = req.user._id
  let url = "/api/v1.0/job/rating-heyclean/register"
  post(body, url, (err, data) => {
   res.json(err || data)
  })
 },

 searchByPhoneRating(req, res) {
  let body = req.body
  body.userId = req.user._id
  let url = "/api/v1.0/job/rating-heyclean/find-by-phone"
  post(body, url, (err, data) => {
   res.json(err || data)
  })
 },

 ratingStar(req, res) {
  const url = `${HEYCARE_CLEAN}/api/v1.0/admin/rating-star`
  const body = req.body
  apiPost(url, body, (err, result) => {
   res.json(err || result)
  })
 },
}
