/*jslint es6 */
import moment from "moment"
import {HEYCLEAN_SERVICE} from "../config.js"
import {postApi} from "./api.js"

export default {
 lectureList(req, res) {
  let url = HEYCLEAN_SERVICE + "/api/v1.0/lecture/list"
  postApi(url, req.body, res)
 },
 lectureAdd(req, res) {
  let url = HEYCLEAN_SERVICE + "/api/v1.0/lecture/add"
  postApi(url, req.body, res)
 },
 lectureModify(req, res) {
  let url = HEYCLEAN_SERVICE + "/api/v1.0/lecture/modify"
  postApi(url, req.body, res)
 },
 lectureInActive(req, res) {
  let url = HEYCLEAN_SERVICE + "/api/v1.0/lecture/inactive"
  postApi(url, req.body, res)
 },
 lectureArrange(req, res) {
  let url = HEYCLEAN_SERVICE + "/api/v1.0/lecture/arrange"
  postApi(url, req.body, res)
 },

 testList(req, res) {
  let url = HEYCLEAN_SERVICE + "/api/v1.0/test/list"
  postApi(url, req.body, res)
 },
 testAdd(req, res) {
  let url = HEYCLEAN_SERVICE + "/api/v1.0/test/add"
  postApi(url, req.body, res)
 },
 testModify(req, res) {
  let url = HEYCLEAN_SERVICE + "/api/v1.0/test/modify"
  postApi(url, req.body, res)
 },
 testInActive(req, res) {
  let url = HEYCLEAN_SERVICE + "/api/v1.0/test/inactive"
  postApi(url, req.body, res)
 },
 testArrange(req, res) {
  let url = HEYCLEAN_SERVICE + "/api/v1.0/test/arrange"
  postApi(url, req.body, res)
 },

 answerAdd(req, res) {
  let url = HEYCLEAN_SERVICE + "/api/v1.0/answer/add"
  postApi(url, req.body, res)
 },
 answerModify(req, res) {
  let url = HEYCLEAN_SERVICE + "/api/v1.0/answer/modify"
  postApi(url, req.body, res)
 },
}
