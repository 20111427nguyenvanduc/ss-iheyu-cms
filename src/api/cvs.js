/*jslint es6 */
import _ from "lodash"
import { CMS_SERVICE, CVS_URL } from "../config.js"
import { apiGet } from "./api"
import Config from "./config"

export default {
 readImgInf(req, res) {
  const { img, formatType = "url", getThumb = false, readType } = req.body
  if (!img || !readType) {
   return res.json({
    code: 400,
    message: {
     body: "Kiểm tra lại dữ liệu nhập vào!",
    },
   })
  }

  let url
  switch (readType) {
   case "card":
    url = `${CVS_URL}/api/v2/ocr/cardex?img=${img}&format_type=${formatType}&get_thumb=${getThumb}&priority=idcard`
    // url = `${CVS_URL}/api/v2/ekyc/card?img=${img}&format_type=${formatType}&get_thumb=${getThumb}`
    break
   case "driving_license":
    url = `${CVS_URL}/api/v2/ocr/cardex?img=${img}&format_type=${formatType}&get_thumb=${getThumb}&priority=driving_license`
    // url = `${CVS_URL}/api/v2/ocr/driving_license?img=${img}&format_type=${formatType}&get_thumb=${getThumb}`
    break
   case "vehicle_registration":
    url = `${CVS_URL}/api/v2/ocr/vehicle_registration?img=${img}&format_type=${formatType}&get_thumb=${getThumb}`
    break
   default:
    return res.json({
     code: 400,
     message: {
      body: "Loại ảnh không hỗ trợ để đọc",
     },
    })
  }
  Config.getCmsConfig(
   { body: { type: 8 } },
   {
    json: (json) => {
     process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0
     apiGet(
      url,
      {},
      (err, result) => {
       res.json(err || result)
      },
      { Authorization: `Basic ${Buffer.from(`${_.get(json, "config.api_key")}:${_.get(json, "config.api_secret")}`).toString("base64")}` },
     )
    },
   },
  )
 },
}
