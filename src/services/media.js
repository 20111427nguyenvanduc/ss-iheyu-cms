import axios from "./axios"
import { MEDIA_URL } from "../config"
// import fs from "fs"
// const fs = require('fs');
export const uploadFile = (body = {}) => {
 const formData = new FormData()
 formData.append("folder", body.folder || "hey-care")
 formData.append("resize", "true")
 formData.append("fileUpload", body.file, body.filename)
 return axios.post(MEDIA_URL + "/api/v1.0/upload-single", formData, {
  headers: {
   "Content-Type": "multipart/form-data",
  },
 })
}

export const deleteFile = (body = {}) => {
 return axios.post(`${MEDIA_URL}/api/v1.0/decline-file`, body)
}
