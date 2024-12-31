/* jslint es6 */
import fs from "fs"
import _ from "lodash"
import {IHEYU_SERVICE} from "../config.js"
import {authPost} from "./api.js"
import {listCategory} from "../services/petition.js"

export default {
 create(req, res) {
  const url = `${IHEYU_SERVICE}/api/v1.0/petition/create`
  authPost(url, req, res)
 },
 list(req, res) {
  const url = `${IHEYU_SERVICE}/api/v1.0/petition/list`
  authPost(url, req, res)
 },
 listCategory(req, res) {
  const url = `${IHEYU_SERVICE}/api/v1.0/petition/category/list`
  authPost(url, req, res)
 },
 listCommunity(req, res) {
  const url = `${IHEYU_SERVICE}/api/v1.0/petition/list-community`
  authPost(url, req, res)
 },
 update(req, res) {
  const url = `${IHEYU_SERVICE}/api/v1.0/petition/update`
  authPost(url, req, res)
 },
 get(req, res) {
  const url = `${IHEYU_SERVICE}/api/v1.0/petition/get`
  authPost(url, req, res)
 },
}
