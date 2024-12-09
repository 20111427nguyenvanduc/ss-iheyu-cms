import React from "react"
import {Stack, Typography} from "@mui/material"
import CONSTANT from "./const"
import moment from "moment"

export const inputFormat = (input, format = ".000 đ") => {
 if (!input || typeof input !== "string") return ""
 if (input.includes(format)) {
  input = input.replace(format, "")
 } else if (input.includes(format.slice(0, -1))) {
  input = input.slice(0, -format.length)
 }

 let result = inputFormatToInt(input)
  .toString()
  .replace(/\D/g, "")
  .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
 return inputFormatToInt(result) ? result + format : ""
}

export const inputFormatToInt = (input) => {
 input = input ? input.replace(/[^0-9]/g, "") : 0
 return parseInt(input)
}

export const getPaymentInf = (orderInf, finalMoneyOnly = false) => {
 const {VAT = 0, bonus = 0, direct = 0, discountMoneyPoint = 0, inapp = 0, pay = 0, priceIncrease = 1, tip = 0} = orderInf.salaryStrategy || {}

 const {resourceFee = 0, point = 0, SMSFee = 0, salary} = orderInf

 const {moneyNomal = 0, nightMoney = 0, patientMoney = 0} = orderInf.moneyInf || {}

 let sendSMS = _.has(orderInf, "sendSMS") ? true : false

 let data = []

 if (moneyNomal && !finalMoneyOnly) {
  data.push({
   title: "Phí dịch vụ theo giờ",
   value: `${moneyNomal.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}đ`,
  })
 }

 if (nightMoney && !finalMoneyOnly) {
  data.push({
   title: "Phụ phí ca đêm",
   value: `${nightMoney.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}đ`,
  })
 }

 if (patientMoney && !finalMoneyOnly) {
  data.push({
   title: "Phí bệnh nhân không tự chủ",
   value: `${patientMoney.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}đ`,
  })
 }

 if (resourceFee && !finalMoneyOnly) {
  data.push({
   title: orderInf.carePlus ? "Phí tài nguyên + bảo hiểm" : "Phí tài nguyên",
   value: `${resourceFee.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}đ`,
  })
 }

 if (SMSFee && !finalMoneyOnly && !sendSMS) {
  data.push({
   title: "Phí gửi SMS",
   value: `${SMSFee.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}đ`,
  })
 }

 if (tip && !finalMoneyOnly) {
  data.push({
   title: "Hỗ trợ tài xế",
   value: `${tip.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}đ`,
  })
 }

 //  if (pay && !finalMoneyOnly) {
 //   data.push({
 //    title: "Khuyến mãi",
 //    value: `- ${pay.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}đ`,
 //   })
 //  }

 return data
}

export const getPaymentInfClean = (orderInf, finalMoneyOnly = false) => {
 const {VAT = 0, bonus = 0, direct = 0, discountMoneyPoint = 0, inapp = 0, pay = 0, priceIncrease = 1, tip = 0} = orderInf.salaryStrategy || {}

 const {resourceFee = 0, point = 0, SMSFee = 0, salary} = orderInf

 let sendSMS = _.has(orderInf, "sendSMS") ? true : false

 let moneyAddonServices = 0

 let moneyNomal = 0

 let data = []

 orderInf.addonServices.map((service, i) => {
  if (service.money) {
   data.push({
    title: "Phí dịch vụ " + service.name,
    value: `${service.money.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}đ`,
   })
   moneyAddonServices += service.money
  }
 })
 moneyNomal = salary - moneyAddonServices
 if (moneyNomal && !finalMoneyOnly) {
  data.push({
   title: "Phí dịch vụ theo giờ",
   value: `${moneyNomal.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}đ`,
  })
 }

 if (resourceFee && !finalMoneyOnly) {
  data.push({
   title: orderInf.carePlus ? "Phí tài nguyên + bảo hiểm" : "Phí tài nguyên",
   value: `${resourceFee.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}đ`,
  })
 }

 if (SMSFee && !finalMoneyOnly && !sendSMS) {
  data.push({
   title: "Phí gửi SMS",
   value: `${SMSFee.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}đ`,
  })
 }

 return data
}

export const getPaymentInfCleanJob = (orderInf, job) => {
 const {VAT = 0, bonus = 0, direct = 0, discountMoneyPoint = 0, inapp = 0, pay = 0, priceIncrease = 1, tip = 0} = orderInf.salaryStrategy || {}

 const {resourceFee = 0, point = 0, SMSFee = 0} = orderInf

 const {salary} = job

 let sendSMS = _.has(orderInf, "sendSMS") ? true : false

 let moneyAddonServices = 0

 let moneyNomal = 0

 let data = []

 orderInf.addonServices && orderInf.addonServices.map((service, i) => {
  if (service.money) {
   data.push({
    title: "Phí dịch vụ " + service.name,
    value: `${service.money.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}đ`,
   })
   moneyAddonServices += service.money
  }
 })
 moneyNomal = salary - moneyAddonServices
 if (moneyNomal) {
  data.push({
   title: "Phí dịch vụ theo giờ",
   value: `${moneyNomal.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}đ`,
  })
 }

 if (resourceFee) {
  data.push({
   title: orderInf.carePlus ? "Phí tài nguyên + bảo hiểm" : "Phí tài nguyên",
   value: `${resourceFee.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}đ`,
  })
 }

 if (SMSFee && !sendSMS) {
  data.push({
   title: "Phí gửi SMS",
   value: `${SMSFee.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}đ`,
  })
 }

 return data
}

export const translateStatus = (status) => {
 switch (status) {
  case CONSTANT.ORDER_STATUS.WAIT_FOR_PAYMENT:
   return stackStatus("Chờ thanh toán", "#161616", "icon-bold-receipt-item")
   break
  case CONSTANT.ORDER_STATUS.DONE:
   return stackStatus("Hoàn thành", "#3CCC65", "icon-bold-verify")
   break
  case CONSTANT.ORDER_STATUS.REJECTED:
   return stackStatus("Đã huỷ", "#FF0000", "icon-bold-information")
   break
  case CONSTANT.ORDER_STATUS.EXECUTING:
   return stackStatus("Đang thực hiện", "#276EF1", "icon-bold-clock")
   break
  case CONSTANT.ORDER_STATUS.FAILED:
   return stackStatus("Không có CSV", "#B6881D", "icon-bold-information")
   break
  default:
   return ""
 }
}

export const translateStatusClean = (status) => {
 switch (status) {
  case CONSTANT.ORDER_CLEAN_STATUS.WAIT_FOR_PAYMENT:
   return stackStatus("Chờ thanh toán", "#161616", "icon-bold-receipt-item")
   break
  case CONSTANT.ORDER_CLEAN_STATUS.DONE:
   return stackStatus("Hoàn thành", "#3CCC65", "icon-bold-verify")
   break
  case CONSTANT.ORDER_CLEAN_STATUS.REJECTED:
   return stackStatus("Đã huỷ", "#FF0000", "icon-bold-information")
   break
  case CONSTANT.ORDER_CLEAN_STATUS.EXECUTING:
   return stackStatus("Đang thực hiện", "#276EF1", "icon-bold-clock")
   break
  case CONSTANT.ORDER_CLEAN_STATUS.FAILED:
   return stackStatus("Không có giúp việc", "#B6881D", "icon-bold-information")
   break
  default:
   return ""
 }
}

const stackStatus = (title, color, icon) => {
 return (
  <Stack direction='row' justifyContent='flex-start' alignItems='center' spacing={0.5} sx={{color: color}}>
   <i style={{fontSize: "16px"}} className={icon} />
   <span style={{fontSize: "14px"}}>{title}</span>
  </Stack>
 )
}

export const translateStatusJob = (status) => {
 switch (status) {
  case CONSTANT.ORDER_JOB_STATUS.WAIT_FOR_CONFIRM:
   return badge("Chờ CSV xác nhận", "#E3F2FF", "#376FFF")
   break
  case CONSTANT.ORDER_JOB_STATUS.PENDING:
   return badge("Đang sắp xếp", "#E3F2FF", "#1589D8")
   break
  case CONSTANT.ORDER_JOB_STATUS.WAIT_FOR_PAYMENT:
   return badge("Chờ thanh toán", "#E3F2FF", "#1589D8")
   break
  case CONSTANT.ORDER_JOB_STATUS.DONE:
   return badge("Hoàn thành", "#E6F8E9", "#3CCC65")
   break
  case CONSTANT.ORDER_JOB_STATUS.REJECTED:
   return badge("Đã huỷ", "#FFEBEF", "#FF0000")
   break
  case CONSTANT.ORDER_JOB_STATUS.CAN_NOT_FIND_CAREGIVER:
   return badge("Không có CSV", "#FFE4B5", "#B6881D")
   break
  case CONSTANT.ORDER_JOB_STATUS.EXECUTING:
   return badge("Đang chăm sóc", "#E5D1FF", "#840AFF")
   break
  case CONSTANT.ORDER_JOB_STATUS.FOUND_CAREGIVER:
   return badge("Đã nhận ca", "#FDEEA0", "#FF7F0A")
   break
  case CONSTANT.ORDER_JOB_STATUS.MOVING:
   return badge("Đang di chuyển", "#E3F2FF", "#376FFF")
   break
  case CONSTANT.ORDER_JOB_STATUS.FINDING:
   return badge("Đang sắp xếp", "#E3F2FF", "#1589D8")
   break
  default:
   return ""
 }
}

export const translateStatusJobClean = (status) => {
 switch (status) {
  case CONSTANT.ORDER_CLEAN_JOB_STATUS.WAIT_FOR_CONFIRM:
   return badge("Chờ xác nhận", "#E3F2FF", "#376FFF")
   break
  case CONSTANT.ORDER_CLEAN_JOB_STATUS.PENDING:
   return badge("Đang sắp xếp", "#E3F2FF", "#1589D8")
   break
  case CONSTANT.ORDER_CLEAN_JOB_STATUS.WAIT_FOR_PAYMENT:
   return badge("Chờ thanh toán", "#E3F2FF", "#1589D8")
   break
  case CONSTANT.ORDER_CLEAN_JOB_STATUS.DONE:
   return badge("Hoàn thành", "#E6F8E9", "#3CCC65")
   break
  case CONSTANT.ORDER_CLEAN_JOB_STATUS.REJECTED:
   return badge("Đã huỷ", "#FFEBEF", "#FF0000")
   break
  case CONSTANT.ORDER_CLEAN_JOB_STATUS.CAN_NOT_FIND_STAFF:
   return badge("Không có giúp việc", "#FFE4B5", "#B6881D")
   break
  case CONSTANT.ORDER_CLEAN_JOB_STATUS.EXECUTING:
   return badge("Đang dọn dẹp", "#E5D1FF", "#840AFF")
   break
  case CONSTANT.ORDER_CLEAN_JOB_STATUS.FOUND_STAFF:
   return badge("Đã nhận ca", "#FDEEA0", "#FF7F0A")
   break
  case CONSTANT.ORDER_CLEAN_JOB_STATUS.MOVING:
   return badge("Đang di chuyển", "#E3F2FF", "#376FFF")
   break
  case CONSTANT.ORDER_CLEAN_JOB_STATUS.FINDING:
   return badge("Đang sắp xếp", "#E3F2FF", "#1589D8")
   break
  default:
   return ""
 }
}

const badge = (title, gbcolor, textcolor) => {
 return (
  <Typography component='h3' sx={{fontSize: "12px", fontWeight: 400, color: `${textcolor}`, padding: "6px 12px", borderRadius: "12px", background: `${gbcolor}`}}>
   {title}
  </Typography>
 )
}

export const getAgeGender = (staff) => {
 let gender = _.get(staff, "gender") === "female" ? "Nữ" : "Nam"
 if (_.get(staff, "birthday") || _.get(staff, "facebook.birthday")) {
  var dateString = _.get(staff, "birthday") || _.get(staff, "facebook.birthday")
  var today = new Date()
  var birthDate = new Date(moment(dateString, "DD/MM/YYYY"))
  var age = today.getFullYear() - birthDate.getFullYear()
  var m = today.getMonth() - birthDate.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
   age--
  }
  return gender + " - " + age + " tuổi"
 }
 return gender
}
