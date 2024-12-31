/* jslint es6 */

import _ from "lodash";
import { IHEYU_SERVICE } from "../config.js";
import { authPost } from "./api.js";

export default {
  list(req, res) {
    const url = `${IHEYU_SERVICE}/api/v1.0/admin/category-permission/list`;
    authPost(url, req, res);
  },
};
