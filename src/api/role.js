/* jslint es6 */
import fs from "fs"
import _ from "lodash"
import {IHEYU_SERVICE} from "../config.js"
import {apiPost} from "./api"

export default {
 list(req, res) {
  const url = `${IHEYU_SERVICE}/api/v1.0/admin/role/list`
  const body = req.body
  const headers = {token: _.get(req, "user.token")} // Đính token vào header
  apiPost(
   url,
   body,
   (err, result) => {
    res.json(err || result)
   },
   headers,
  )
 },
 create(req, res) {
  const url = `${IHEYU_SERVICE}/api/v1.0/admin/role/create`
  const body = req.body
  const headers = {token: _.get(req, "user.token")} // Đính token vào header
  apiPost(
   url,
   body,
   (err, result) => {
    res.json(err || result)
   },
   headers,
  )
 },
 update(req, res) {
  const url = `${IHEYU_SERVICE}/api/v1.0/admin/role/update`
  const body = req.body
  const headers = {token: _.get(req, "user.token")} // Đính token vào header
  apiPost(
   url,
   body,
   (err, result) => {
    res.json(err || result)
   },
   headers,
  )
 },
 inactive(req, res) {
  const url = `${IHEYU_SERVICE}/api/v1.0/admin/role/inactive`
  const body = req.body
  const headers = {token: _.get(req, "user.token")} // Đính token vào header
  apiPost(
   url,
   body,
   (err, result) => {
    res.json(err || result)
   },
   headers,
  )
 },
}
