/* jslint es6 */
import fs from "fs"
import _ from "lodash"
import { HEYCARE_SERVICE, HEYCLEAN_SERVICE } from "../config.js"
import { apiPost } from "./api"
import { post } from "./job"
import CONSTANT from "../const"

export default {
 revenue(req, res) {
  const url = `${HEYCARE_SERVICE}/api/v1.0/admin/revenue`
  const body = req.body
  apiPost(url, body, (err, result) => {
   res.json(err || result)
  })
 },
 statisticJob(req, res) {
  const url = `${HEYCARE_SERVICE}/api/v1.0/admin/statistic-job`
  const body = req.body
  apiPost(url, body, (err, result) => {
   res.json(err || result)
  })
 },
 revenueClean(req, res) {
  const url = `${HEYCLEAN_SERVICE}/api/v1.0/admin/revenue-clean`
  const body = req.body
  apiPost(url, body, (err, result) => {
   res.json(err || result)
  })
 },
 statisticJobClean(req, res) {
  const url = `${HEYCLEAN_SERVICE}/api/v1.0/admin/statistic-clean`
  const body = req.body
  apiPost(url, body, (err, result) => {
   res.json(err || result)
  })
 },
}
