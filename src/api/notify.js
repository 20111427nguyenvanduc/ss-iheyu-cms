/*jslint es6 */
import request from 'request';
import { API_URL, ORDERS_URL, CMS_SERVICE } from '../config.js';
import PushNotifyManager from './notifyManager.js';
import { postApi } from './api';
export default {
  sendNotifyMsg(req, res) {
    let {
      body: { id, message, order_id, phone },
      user,
    } = req;

    let title = 'Thông báo';

    PushNotifyManager.sendToMember(
      id,
      title,
      message,
      {
        link: 'DefaultPopup',
        extras: {
          id: order_id,
          title,
          description: message,
        },
      },
      'new_chat_message',
      'driver'
    )
      .then((result) => {
        const log = {
          author: `${user.name.first} ${user.name.last}`,
          phone: phone || id,
          action: 'Gửi thông báo',
          reason: message,
          userId: user._id,
          region: user.region,
          member: id,
        };
        ActivityLogs.create(log, (error) => {});
        res.json(result);
      })
      .catch((err) => {
        res.json({ code: 300 });
      });
  },

  list(req, res) {
    const url = `${CMS_SERVICE}/api/v1.0/push-noti/list`;
    const body = req.body;
    body.supporter = req.user._id;
    postApi(url, body, res);
  },

  create(req, res) {
    const url = `${CMS_SERVICE}/api/v1.0/push-noti/create`;
    const body = req.body;
    body.supporter = req.user._id;
    postApi(url, body, res);
  },

  get(req, res) {
    const url = `${CMS_SERVICE}/api/v1.0/push-noti/get`;
    const body = req.body;
    body.supporter = req.user._id;
    postApi(url, body, res);
  },

  update(req, res) {
    const url = `${CMS_SERVICE}/api/v1.0/push-noti/update`;
    const body = req.body;
    body.supporter = req.user._id;
    postApi(url, body, res);
  },

  push(req, res) {
    const url = `${CMS_SERVICE}/api/v1.0/push-noti/push`;
    const body = req.body;
    body.supporter = req.user._id;
    postApi(url, body, res);
  },

  cancel(req, res) {
    const url = `${CMS_SERVICE}/api/v1.0/push-noti/cancel`;
    const body = req.body;
    body.supporter = req.user._id;
    postApi(url, body, res);
  },

  schedule(req, res) {
    const url = `${CMS_SERVICE}/api/v1.0/push-noti/schedule`;
    const body = req.body;
    body.supporter = req.user._id;
    postApi(url, body, res);
  },

  logs(req, res) {
    const url = `${CMS_SERVICE}/api/v1.0/push-noti/logs`;
    const body = req.body;
    body.supporter = req.user._id;
    postApi(url, body, res);
  },
};
