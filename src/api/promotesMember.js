/* jslint es6 */
import fs from "fs"
import _ from "lodash"
import {HEYCLEAN_SERVICE} from "../config.js"
import {apiPost} from "./api"
import CONSTANT from "../const"

export default {
 getListPromote(req, res) {
  const url = `${HEYCLEAN_SERVICE}/api/v1.0/promote-member/list`
  const body = req.body
  apiPost(url, body, (err, result) => {
   res.json(err || result)
  })
 },
 getAllAuthor(req, res) {
  const url = `${HEYCLEAN_SERVICE}/api/v1.0/promote-member/get-author-add-promotes`
  const body = req.body
  apiPost(url, body, (err, result) => {
   res.json(err || result)
  })
 },
 getInfPhonePromote(req, res) {
  const url = `${HEYCLEAN_SERVICE}/api/v1.0/promote-member/get-phone-inf-promote`
  const body = req.body
  apiPost(url, body, (err, result) => {
   res.json(err || result)
  })
 },
 addPromoteToMember_v2(req, res) {
  const url = `${HEYCLEAN_SERVICE}/api/v1.0/promote-member/add-promote-to-member-v2`
  const body = req.body
  apiPost(url, body, (err, result) => {
   res.json(err || result)
  })
 },
}
