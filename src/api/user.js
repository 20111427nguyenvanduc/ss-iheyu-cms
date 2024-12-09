/* jslint es6 */
import fs from "fs"
import _ from "lodash"
import { HEYCARE_SERVICE, API_URL, ORDERS_URL } from "../config.js"
import { apiPost } from "./api"
import CONSTANT from "../const"

export default {
 list(req, res) {
  const url = `${HEYCARE_SERVICE}/api/v1.0/admin/user-list`
  const body = req.body
  apiPost(url, body, (err, result) => {
   res.json(err || result)
  })
 },
 read(req, res) {
  const url = `${HEYCARE_SERVICE}/api/v1.0/admin/user-read`
  const body = req.body
  apiPost(url, body, (err, result) => {
   res.json(err || result)
  })
 },
 create(req, res) {
  const url = `${HEYCARE_SERVICE}/api/v1.0/admin/user-create`
  const body = req.body
  apiPost(url, body, (err, result) => {
   res.json(err || result)
  })
 },
 update(req, res) {
  const url = `${HEYCARE_SERVICE}/api/v1.0/admin/user-update`
  const body = req.body
  apiPost(url, body, (err, result) => {
   res.json(err || result)
  })
 },
 active(req, res) {
  const url = `${HEYCARE_SERVICE}/api/v1.0/admin/user-active`
  const body = req.body
  apiPost(url, body, (err, result) => {
   res.json(err || result)
  })
 },
}
