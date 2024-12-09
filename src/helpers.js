import _ from "lodash"
import axios from "./services/axios"
import ms from "ms"
export const typeAddTrans = (type) => {
 switch (type) {
  case 1:
  case "1":
   return "Hỗ trợ"
   break
  case 2:
  case "2":
   return "Đền bù"
   break
  case 3:
  case "3":
   return "Truy thu"
   break
  case 4:
  case "4":
   return "Quán không nhận tiền"
   break
  case 5:
  case "5":
   return "Cộng tiền đơn tự giao"
   break
  default:
   return type
 }
}

export function createID() {
 function s4() {
  return Math.floor((1 + Math.random()) * 0x10000)
   .toString(16)
   .substring(1)
 }

 return s4() + s4() + s4() + "-" + s4() + s4() + s4() + "-" + s4() + s4() + s4()
}

export function timeAgoTranslate(timeAgo) {
 let newTimeAgo = timeAgo
 if (timeAgo === "a few seconds ago") {
  return "Vừa xong"
 }
 newTimeAgo = _.replace(newTimeAgo, "ago", "trước")
 newTimeAgo = _.replace(newTimeAgo, "seconds", "giây")
 newTimeAgo = _.replace(newTimeAgo, "second", "giây")
 newTimeAgo = _.replace(newTimeAgo, "minutes", "phút")
 newTimeAgo = _.replace(newTimeAgo, "minute", "phút")
 newTimeAgo = _.replace(newTimeAgo, "hours", "giờ")
 newTimeAgo = _.replace(newTimeAgo, "hour", "giờ")
 newTimeAgo = _.replace(newTimeAgo, "days", "ngày")
 newTimeAgo = _.replace(newTimeAgo, "day", "ngày")
 newTimeAgo = _.replace(newTimeAgo, "weeks", "tuần")
 newTimeAgo = _.replace(newTimeAgo, "week", "tuần")
 newTimeAgo = _.replace(newTimeAgo, "months", "tháng")
 newTimeAgo = _.replace(newTimeAgo, "month", "tháng")
 newTimeAgo = _.replace(newTimeAgo, "years", "năm")
 newTimeAgo = _.replace(newTimeAgo, "year", "năm")
 newTimeAgo = _.replace(newTimeAgo, "an ", "1 ")
 newTimeAgo = _.replace(newTimeAgo, "a ", "1 ")
 return newTimeAgo
}

export const timeTrans = (time) => {
 let trans = time
 trans = trans.replace("h", " giờ")
 trans = trans.replace("w", " tuần")
 trans = trans.replace("m", " phút")
 trans = trans.replace("y", " năm")
 trans = trans.replace("s", " giây")
 trans = trans.replace("d", " ngày")
 return trans
}

export function convertToVND(money) {
 if (_.isNumber(money)) {
  money = money.toLocaleString("it-IT", {
   style: "currency",
   currency: "VND",
  })
 }
 return money
}
export function convertLatLng(data) {
 if (typeof data != "number") {
  let latOrLng = data.trim()
  let latOrLngConver = parseFloat(latOrLng, 10)
  return latOrLngConver
 } else {
  return data
 }
}

export function creatLog (body, cb = () => {}) {
  // axios.post('/api/activity/create-log', body).then(res => {
  //   cb(res.data)
  // })
}

export const moneyFomat = (value, format = " đ") => {
 value = toInt(value)
 if (value > Number.MAX_SAFE_INTEGER) value = Number.MAX_SAFE_INTEGER
 return value || _.isNumber(value) ? value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + format : ""
}

export const toInt = (value) => {
 return value ? parseInt(value.toString().replace(/[^0-9]/g, "")) : 0
}

export const rdId = () => {
 return "_" + Math.random().toString(36).substr(2, 9)
}

export function calMidPoint(paths) {
 let count = paths.length
 let lat = paths.map((path) => path.lat).reduce((a, b) => a + b, 0) / count
 let lng = paths.map((path) => path.lng).reduce((a, b) => a + b, 0) / count
 return {
  lat,
  lng,
 }
}

export const msToTime = (duration) => {
 var minutes = Math.floor((duration / (1000 * 60)) % 60),
  hours = Math.floor((duration / (1000 * 60 * 60)) % 24)

 hours = hours < 10 ? "0" + hours : hours
 minutes = minutes < 10 ? "0" + minutes : minutes

 return hours + ":" + minutes
}

function padTo2Digits(num) {
 return num.toString().padStart(2, "0")
}

export const convertMsToTime = (milliseconds) => {
 let seconds = Math.floor(milliseconds / 1000)
 let minutes = Math.floor(seconds / 60)
 let hours = Math.floor(minutes / 60)

 seconds = seconds % 60
 minutes = minutes % 60

 // 👇️ If you don't want to roll hours over, e.g. 24 to 00
 // 👇️ comment (or remove) the line below
 // commenting next line gets you `24:00:00` instead of `00:00:00`
 // or `36:15:31` instead of `12:15:31`, etc.
 hours = hours % 24

 return `${padTo2Digits(hours)}:${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`
}

export const convertTimeToMs = (time) => {
 let timeAr = time.split(":")
 // let seconds = timeAr[2];
 let minutes = timeAr[1]
 let hours = timeAr[0]

 return hours * ms("1h") + minutes * ms("1m") //+ seconds*ms('1s');
}

function deg2rad(deg) {
 return deg * (Math.PI / 180)
}

export const calculateDistance = (lat1, lng1, lat2, lng2) => {
 const R = 6371.008 // Radius of the earth in km
 const dLat = deg2rad(lat2 - lat1) // deg2rad below
 const dLon = deg2rad(lng2 - lng1)
 const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
 const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
 const d = R * c // Distance in km
 return parseFloat(d.toFixed(1))
}

export const eatcake = (egg, flour) => {
 let pieces = cutcake({ i: 2147483647 }, egg + flour, 2023).toString(36)
 let hungry = cutcake({ i: 131071 }, pieces + "AEeasdWQEAADADQwdwdwqDWQDQDasfCaFdsFSDGVfsvrtbtyytnyunuYRHRYERTYRTGHRBRTYNuytyrTrgfrgwdf", 3009178360)
 return hungry.toString()
}

export const b64toFile = (dataURL) => {
 var blobBin = atob(dataURL.split(",")[1])
 var array = []
 for (var i = 0; i < blobBin.length; i++) {
  array.push(blobBin.charCodeAt(i))
 }
 var file = new Blob([new Uint8Array(array)], { type: "image/png" })
 return file
}

function addinfo(a, iii) {
 for (var b = iii, c = 0, d = 0, e = a.length; d < e; ++d) (c *= 1729), (c += a[d]), (c %= b)
 return c
}

function cutcake(a, b, c) {
 for (var d = Array(b.length), e = 0, f = b.length; e < f; ++e) d[e] = b.charCodeAt(e)
 d.unshift(c)
 return addinfo(d, a.i)
}

const arrStartedPhoneNumber = ["09", "01", "08", "02", "84", "05", "03", "07"]
