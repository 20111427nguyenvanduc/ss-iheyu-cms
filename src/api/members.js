/* jslint es6 */
import fs from "fs"
import _ from "lodash"
import {HEYCARE_SERVICE, API_URL, ORDERS_URL} from "../config.js"
import {apiPost} from "./api"
import CONSTANT from "../const"

export default {
 listMemberHeyCare(req, res) {
  const url = `${HEYCARE_SERVICE}/api/v1.0/admin/member-list`
  const body = req.body
  apiPost(url, body, (err, result) => {
   res.json(err || result)
  })
 },

 authenHeyCare(req, res) {
  const url = `${HEYCARE_SERVICE}/api/v1.0/admin/member-authen`
  const body = req.body
  apiPost(url, body, (err, result) => {
   res.json(err || result)
  })
 },

 getStaffNearest(req, res) {
  const url = `${HEYCARE_SERVICE}/api/v1.0/staff/get-nearest`
  const body = req.body
  apiPost(url, body, (err, result) => {
   res.json(err || result)
  })
 },

 getStaffValid(req, res) {
  const url = `${HEYCARE_SERVICE}/api/v1.0/staff/check-valid`
  const body = req.body
  apiPost(url, body, (err, result) => {
   res.json(err || result)
  })
 },

 blockMember(req, res) {
  const url = `${HEYCARE_SERVICE}/api/v1.0/admin/member-block`
  const body = req.body
  apiPost(url, body, (err, result) => {
   res.json(err || result)
  })
 },

 unblockMember(req, res) {
  const url = `${HEYCARE_SERVICE}/api/v1.0/admin/member-unblock`
  const body = req.body
  apiPost(url, body, (err, result) => {
   res.json(err || result)
  })
 },

 chargeMember(req, res) {
  const url = `${HEYCARE_SERVICE}/api/v1.0/admin/member-charge`
  const body = req.body
  apiPost(url, body, (err, result) => {
   res.json(err || result)
  })
 },

 chargeLog(req, res) {
  const url = `${HEYCARE_SERVICE}/api/v1.0/admin/charge-log`
  const body = req.body
  apiPost(url, body, (err, result) => {
   res.json(err || result)
  })
 },

 chargeLogAnalytic(req, res) {
  const url = `${HEYCARE_SERVICE}/api/v1.0/admin/charge-log-analytic`
  const body = req.body
  apiPost(url, body, (err, result) => {
   res.json(err || result)
  })
 },

 openTraining(req, res) {
  const url = `${ORDERS_URL}/api/v1.0/order/open-training`
  const body = req.body
  apiPost(url, body, (err, result) => {
   res.json(err || result)
  })
 },

 memberLogCreate(req, res) {
  const url = `${HEYCARE_SERVICE}/api/v1.0/admin/member-log-create`
  const body = req.body
  apiPost(url, body, (err, result) => {
   res.json(err || result)
  })
 },

 memberLogList(req, res) {
  const url = `${HEYCARE_SERVICE}/api/v1.0/admin/member-log-list`
  const body = req.body
  apiPost(url, body, (err, result) => {
   res.json(err || result)
  })
 },
}
