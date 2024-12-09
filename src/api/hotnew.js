/* jslint es6 */
import fs from "fs"
import _ from "lodash"
import {HEYCARE_SERVICE} from "../config.js"
import {apiPost} from "./api.js"
import CONSTANT from "../const.js"

export default {
 list(req, res) {
  const url = `${HEYCARE_SERVICE}/api/v1.0/admin/hotnew-list`
  const body = req.body
  apiPost(url, body, (err, result) => {
   res.json(err || result)
  })
 },

 create(req, res) {
  const url = `${HEYCARE_SERVICE}/api/v1.0/admin/hotnew-create`
  const body = req.body
  apiPost(url, body, (err, result) => {
   res.json(err || result)
  })
 },

 update(req, res) {
  const url = `${HEYCARE_SERVICE}/api/v1.0/admin/hotnew-update`
  const body = req.body
  apiPost(url, body, (err, result) => {
   res.json(err || result)
  })
 },

 notificationList(req, res) {
  const url = `${HEYCARE_SERVICE}/api/v1.0/admin/notification-list`
  const body = req.body
  apiPost(url, body, (err, result) => {
   res.json(err || result)
  })
 },
}
