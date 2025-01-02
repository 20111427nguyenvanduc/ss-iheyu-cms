import { IHEYU_SERVICE, MEDIA_URL } from "../config.js";
import { authPost, postFromData } from "./api";

export default {
  uploadSingle(req, res) {
    let url = MEDIA_URL + "/api/v1.0/upload-single";
    postFromData(url, req, {
      ...res,
      json: (response) => {
        let filename = _.get(response, "filename");
        _.set(response, "filename", MEDIA_URL + filename);
        res.json(response);
      },
    });
  },

  declineFile(req, res) {
    let url = MEDIA_URL + "/api/v1.0/decline-file";
    authPost(url, req, res);
  },
};
