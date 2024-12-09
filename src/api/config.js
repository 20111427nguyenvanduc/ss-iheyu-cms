/*jslint es6 */
import request from "request"
import { NEW_JOB_URL } from "../config.js"
import { apiPost } from "./api"
export default {
 getCmsConfig(req, res) {
  const url = NEW_JOB_URL + "/api/v1.0/user/get-config-cms"
  const body = req.body
  body.userId = req.user._id
  apiPost(url, body, (err, result) => {
   res.json(err || result)
  })
 },
}
