/* jslint es6 */
import fs from "fs"
import _ from "lodash"
import { HEYCARE_SERVICE, API_URL, ORDERS_URL } from "../config.js"
import { apiPost } from "./api"
import CONSTANT from "../const"

export default {
 listCaregiverHeyCare(req, res) {
  const url = `${HEYCARE_SERVICE}/api/v1.0/admin/caregiver-list`
  const body = req.body
  apiPost(url, body, (err, result) => {
   res.json(err || result)
  })
 },

 updateAuthenHeyCare(req, res) {
  const url = `${HEYCARE_SERVICE}/api/v1.0/admin/update-authen`
  const body = req.body
  apiPost(url, body, (err, result) => {
   res.json(err || result)
  })
 },
}
