/* jslint es6 */

import _ from "lodash";
import { IHEYU_SERVICE } from "../config.js";
import { authPost } from "./api";

export default {
  list(req, res) {
    const url = `${IHEYU_SERVICE}/api/v1.0/admin/group-permission/list`;
    authPost(url, req, res);
  },
  create(req, res) {
    const url = `${IHEYU_SERVICE}/api/v1.0/admin/group-permission/create`;
    authPost(url, req, res);
  },
  update(req, res) {
    const url = `${IHEYU_SERVICE}/api/v1.0/admin/group-permission/update`;
    authPost(url, req, res);
  },
  inactive(req, res) {
    const url = `${IHEYU_SERVICE}/api/v1.0/admin/group-permission/inactive`;
    authPost(url, req, res);
  },
};
