/* jslint es6 */
import _ from 'lodash';
import { IHEYU_SERVICE } from '../config.js';
import { authPost } from './api';

export default {
  listCategory(req, res) {
    const url = `${IHEYU_SERVICE}/api/v1.0/admin/service/list-category`;
    authPost(url, req, res);
  },
  listService(req, res) {
    const url = `${IHEYU_SERVICE}/api/v1.0/admin/service/list-service`;
    authPost(url, req, res);
  },
  listServiceChildren(req, res) {
    const url = `${IHEYU_SERVICE}/api/v1.0/admin/service/list-child`;
    authPost(url, req, res);
  },
  hideShowService(req, res) {
    const url = `${IHEYU_SERVICE}/api/v1.0/admin/service/hide-show`;
    authPost(url, req, res);
  },
  orderingServices(req, res) {
    const url = `${IHEYU_SERVICE}/api/v1.0/admin/service/ordering`;
    authPost(url, req, res);
  },
  updateIconService(req, res) {
    const url = `${IHEYU_SERVICE}/api/v1.0/admin/service/update-icon`;
    authPost(url, req, res);
  },
};
