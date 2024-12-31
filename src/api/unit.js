/* jslint es6 */

import _ from "lodash";
import { IHEYU_SERVICE } from "../config.js";
import { authPost } from "./api.js";

export default {
  list(req, res) {
    const url = `${IHEYU_SERVICE}/api/v1.0/admin/unit/list`;
    authPost(url, req, res);
  },
  create(req, res) {
    const url = `${IHEYU_SERVICE}/api/v1.0/admin/unit/create`;
    authPost(url, req, res);
  },
  update(req, res) {
    const url = `${IHEYU_SERVICE}/api/v1.0/admin/unit/update`;
    authPost(url, req, res);
  },
  inactive(req, res) {
    const url = `${IHEYU_SERVICE}/api/v1.0/admin/unit/inactive`;
    authPost(url, req, res);
  },
  listLevel(req, res) {
    const url = `${IHEYU_SERVICE}/api/v1.0/admin/unit/list-level`;
    authPost(url, req, res);
  },
  get(req, res) {
    const url = `${IHEYU_SERVICE}/api/v1.0/admin/unit/get`;
    authPost(url, req, res);
  },
};
