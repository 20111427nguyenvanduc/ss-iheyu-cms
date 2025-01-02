import axios from "./axios";
import { MEDIA_URL } from "../config";

export const uploadFile = (body = {}) => {
  const formData = new FormData();
  formData.append("folder", body.folder || "iHaiPhong");
  formData.append("resize", "true");
  formData.append("fileUpload", body.file, body.filename);
  var config = {
    method: "post",
    url: "/media/upload-single",
    headers: { "Content-Type": "multipart/form-data" },
    data: formData,
  };
  return axios(config);
};

export const deleteFile = (body = {}) => {
  return axios.post(`/media/delete-file`, body);
};
