/*jslint es6 */
import _ from "lodash"
import axios from "axios"
export default {
 image(req, res) {
  const {url} = req.body
  axios
   .get(url, {
    responseType: 'arraybuffer'
    // responseType: 'blob'
   })
   .then((response) => {
    res.json({
     code: 200,
     data: Buffer.from(response.data, 'binary').toString('base64')
    })
   })
 },
}
