/* jslint es6 */
import fs from "fs"
import _ from "lodash"
import {HEYCARE_SERVICE} from "../config.js"
import {apiPost} from "./api.js"
import CONSTANT from "../const.js"

export default {
 list(req, res) {
  const url = `${HEYCARE_SERVICE}/api/v1.0/price-increase/list`
  const body = req.body
  apiPost(url, body, (err, result) => {
   res.json(err || result)
  })
 },
 create(req, res) {
  const url = `${HEYCARE_SERVICE}/api/v1.0/price-increase/create`
  const body = req.body
  apiPost(url, body, (err, result) => {
   res.json(err || result)
  })
 },
 update(req, res) {
  const url = `${HEYCARE_SERVICE}/api/v1.0/price-increase/update`
  const body = req.body
  apiPost(url, body, (err, result) => {
   res.json(err || result)
  })
 },
 delete(req, res) {
  const url = `${HEYCARE_SERVICE}/api/v1.0/price-increase/delete`
  const body = req.body
  apiPost(url, body, (err, result) => {
   res.json(err || result)
  })
 },
}
