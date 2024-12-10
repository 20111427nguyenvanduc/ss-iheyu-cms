import _ from "lodash"
import axios from "axios"
import request from "request"

const post = (url, req, res) => {
 const { body } = req
 axios
  .post(url, body)
  .then((response) => {
   res.json(response.data)
  })
  .catch((err) => {
   res.json({
    code: CONSTANT.CODE.SYSTEM_ERROR,
    message: {
     head: "Thông báo lỗi",
     body: _.get(err, "message", "Lỗi hệ thống vui lòng thử lại sau"),
    },
   })
  })
}

const get = (url, req, res) => {
 const { params, query } = req
 axios
  .get(url, {
   ...params,
   ...query,
  })
  .then((response) => {
   res.json(response.data)
  })
  .catch((err) => {
   res.json({
    code: CONSTANT.CODE.SYSTEM_ERROR,
    message: {
     head: "Thông báo lỗi",
     body: _.get(err, "message", "Lỗi hệ thống vui lòng thử lại sau"),
    },
   })
  })
}

const getMultipart = (req, res) => {
 const { url } = req.body
 axios
  .get(url, {
   responseType: "arraybuffer",
  })
  .then((response) => {
   res.json({
    code: CONSTANT.CODE.SUCCESS,
    data: Buffer.from(response.data, "binary").toString("base64"),
   })
  })
  .catch((err) => {
   res.json({
    code: CONSTANT.CODE.SYSTEM_ERROR,
    message: {
     head: "Thông báo lỗi",
     body: _.get(err, "message", "Lỗi hệ thống vui lòng thử lại sau"),
    },
   })
  })
}

export default { post, get, getMultipart }
