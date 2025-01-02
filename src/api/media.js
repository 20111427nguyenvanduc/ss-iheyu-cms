import { IHEYU_SERVICE, MEDIA_URL } from "../config.js";
import { authPost, postFromData } from "./api";

export default {
  uploadSingle(req, res) {
    let url = MEDIA_URL + "/api/v1.0/upload-single";
    postFromData(url, req, res);
  },

  declineFile(req, res) {
    let url = MEDIA_URL + "/api/v1.0/decline-file";
    authPost(url, req, res);
  },
};
