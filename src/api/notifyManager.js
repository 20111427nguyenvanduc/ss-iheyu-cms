/*jslint es6 */
import request from 'request';
import {API_URL, ORDERS_URL, NOTIFY_URL} from '../config.js'

export default {
  sendToMember(userId, title, message, data, eventName, appName, icon) {
    return new Promise((resolve, reject) => {
      const options = {
        method: 'POST',
        uri: `${NOTIFY_URL}/api/v1.0/push-notification/member`,
        body: {
            userId,
            title,
            message,
            data,
            eventName,
            appName,
            icon
        },
        json: true // Automatically stringifies the body to JSON
      };

      request(options, (error, response, result)=>{
        try {
          if (error) {
            reject(error)
          }
          if(result.code === 501) {
            return reject(new Error(`Not found token inf`))
          }
          if((result.code === 300) || (result.code === 500)) {
            return reject(new Error(`Push fail`))
          }
          resolve(result)

        } catch (e) {
          reject(e)
        }
      })
    });
  }

}
