/*jslint es6 */
import {API_URL} from '../config.js'
import {
  postApi
} from './api.js'

export default {
  getMessages(req, res) {
    const {members, from, limit, isReceiver} = req.body;
    let body = {
        listUserInGroup: members,
        from,
        limit
    }
    let url = API_URL + '/api/v2.0/chat/get-message-by-list-user'
    if (isReceiver) {
      url = API_URL + '/api/v2.0/chat/get-message-by-list-user-receiver-web'
    }
    postApi(url, body, res)
  },

}
