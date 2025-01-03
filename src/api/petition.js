/* jslint es6 */
import fs from "fs"
import _ from "lodash"
import {IHEYU_SERVICE} from "../config.js"
import {authPost} from "./api.js"

export default {
 list(req, res) {
  const url = `${IHEYU_SERVICE}/api/v1.0/admin/petition/list`
  authPost(url, req, res)
 },

 listForIndividual(req, res) {
  const url = `${IHEYU_SERVICE}/api/v1.0/admin/petition/list-for-individual`
  authPost(url, req, res)
 },

 count(req, res) {
  const url = `${IHEYU_SERVICE}/api/v1.0/admin/petition/count`
  authPost(url, req, res)
 },

 countForIndividual(req, res) {
  const url = `${IHEYU_SERVICE}/api/v1.0/admin/petition/count-for-individual`
  authPost(url, req, res)
 },

 get(req, res) {
  const url = `${IHEYU_SERVICE}/api/v1.0/admin/petition/get`
  authPost(url, req, res)
 },

 getLogJob(req, res) {
  const url = `${IHEYU_SERVICE}/api/v1.0/admin/petition/get-log-job`
  authPost(url, req, res)
 },

 tiepNhanXyLy(req, res) {
  const url = `${IHEYU_SERVICE}/api/v1.0/admin/petition/tiep-nhan-xu-ly`
  authPost(url, req, res)
 },

 getUnitChildren(req, res) {
  const url = `${IHEYU_SERVICE}/api/v1.0/admin/petition/get-unit-children`
  authPost(url, req, res)
 },

 getUserByUnit(req, res) {
  const url = `${IHEYU_SERVICE}/api/v1.0/admin/petition/get-user-by-unit`
  authPost(url, req, res)
 },
}
