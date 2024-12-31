/* jslint es6 */

import _ from "lodash";
import { IHEYU_SERVICE } from "../config.js";
import { authPost } from "./api.js";

export default {
  list(req, res) {
    const url = `${IHEYU_SERVICE}/api/v1.0/admin/category/list`;
    authPost(url, req, res);
  },
  create(req, res) {
    const url = `${IHEYU_SERVICE}/api/v1.0/admin/category/create`;
    authPost(url, req, res);
  },
  update(req, res) {
    const url = `${IHEYU_SERVICE}/api/v1.0/admin/category/update`;
    authPost(url, req, res);
  },
  inactive(req, res) {
    const url = `${IHEYU_SERVICE}/api/v1.0/admin/category/inactive`;
    authPost(url, req, res);
  },
};
