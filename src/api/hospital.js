/* jslint es6 */
import fs from "fs"
import _ from "lodash"
import { HEYCARE_SERVICE, API_URL, ORDERS_URL } from "../config.js"
import { apiPost } from "./api"
import CONSTANT from "../const"

export default {
 list(req, res) {
  const url = `${HEYCARE_SERVICE}/api/v1.0/hospital/list-for-admin`
  const body = req.body
  apiPost(url, body, (err, result) => {
   res.json(err || result)
  })
 },
 add(req, res) {
  const url = `${HEYCARE_SERVICE}/api/v1.0/hospital/add`
  const body = req.body
  apiPost(url, body, (err, result) => {
   res.json(err || result)
  })
 },
 modify(req, res) {
  const url = `${HEYCARE_SERVICE}/api/v1.0/hospital/modify`
  const body = req.body
  apiPost(url, body, (err, result) => {
   res.json(err || result)
  })
 },
 inactive(req, res) {
  const url = `${HEYCARE_SERVICE}/api/v1.0/hospital/inactive`
  const body = req.body
  apiPost(url, body, (err, result) => {
   res.json(err || result)
  })
 },
}
