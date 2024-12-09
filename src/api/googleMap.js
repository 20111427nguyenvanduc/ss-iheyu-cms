/*jslint es6 */
import request from "request"
import _ from "lodash"
import {LOCATION_URL, GOOGLE_SERVICE, GOOGLE_URL, API_URL} from "../config.js"
import {postApi} from "./api.js"

const getLocationShipper = (body, cb) => {
 let options = {
  url: LOCATION_URL + "/api/v1.0/admin/list-location-staff",
  method: "POST",
  strictSSL: false,
  headers: {
   "content-type": "application/json",
  },
  body: JSON.stringify(body),
 } 
 request(options, (error, response, body) => {
  let bodyData = body ? JSON.parse(body) : body
  cb((bodyData && bodyData.locations) || undefined)
 })
}

const getLocationByTime = (startTime, endTime, staff, cb) => {
 let times = [],
  step = ms("30m"),
  locations = []
 for (let i = startTime + 0; i < endTime + 0; i += step) {
  let time = {
   startTime: i,
   endTime: i + step < endTime ? i - 1 + step : endTime + 0,
  }
  times.push(time)
 }
 async.mapLimit(
  times,
  1,
  (time, done) => {
   time.staff = staff
   getLocationShipper(time, (data) => {
    if (_.isArray(data)) {
     locations = locations.concat(data)
    }
    done()
   })
  },
  (err) => {
   cb(locations)
  },
 )
}

export default {
 showLocations(req, res) {
  let {startTime, endTime, staff} = req.body
  getLocationByTime(startTime, endTime, staff, (locations = []) => {
   res.json({
    code: 200,
    locations: locations,
   })
  })
 },

 getLocationNameByLatLng(req, res) {
  if (!_.get(req, "body.lat") || !_.get(req, "body.lng")) {
   return res.json({
    code: 300,
   })
  }
  let url = GOOGLE_SERVICE + "/api/v1.0/google/get-location-name"
  postApi(url, req.body, res)
 },

 getDistanceByLatLng(req, res) {
  let url = GOOGLE_SERVICE + "/api/v1.0/google/get-distance"
  postApi(url, req.body, res)
 },

 getMemberCurrentLocation(req, res) {
  let url = LOCATION_URL + "/api/v1.0/staff/get-latest-location"
  postApi(url, req.body, res)
 },

 predictLocation(req, res) {
  let url = GOOGLE_URL + "/api/v1.0/google/place-autocomplete"
  postApi(url, req.body, res)
 },

 getLocation(req, res) {
  let url = GOOGLE_URL + "/api/v1.0/google/place-detail"
  postApi(url, req.body, res)
 },

 getRegion(req, res) {
  let url = LOCATION_URL + "/api/v2.0/region/lat-lng"
  postApi(url, req.body, res)
 },

 getShipperNearest(req, res) {
  let url = LOCATION_URL + "/api/v2.0/shipper/get-nearest"
  postApi(url, req.body, res)
 },
}
