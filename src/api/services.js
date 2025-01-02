/* jslint es6 */
import _ from "lodash";
import { IHEYU_SERVICE } from "../config.js";
import { authPost } from "./api";

export default {
  listCategory(req, res) {
    const url = `${IHEYU_SERVICE}/api/v1.0/services/list-category`;
    authPost(url, req, res);
  },
  listService(req, res) {
    const url = `${IHEYU_SERVICE}/api/v1.0/services/list`;
    authPost(url, req, res);
  },
  listServiceChildren(req, res) {
    const url = `${IHEYU_SERVICE}/api/v1.0/services/list-service-children`;
    authPost(url, req, res);
  },
};
