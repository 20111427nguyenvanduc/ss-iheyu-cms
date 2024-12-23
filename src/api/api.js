import request from "request"

const postApi = (url, body, res) => {
 let options = {
  url: url,
  method: "POST",
  strictSSL: false,
  headers: {
   "content-type": "application/json",
  },
  body: JSON.stringify(body),
 }
 request(options, (error, response, body) => {
  let bodyData = body ? JSON.parse(body) : { code: 500 }
  if (error) {
   res.json({
    code: 300,
    message: "Có lỗi xảy ra vui lòng thử lại sau",
   })
  } else {
   res.json(bodyData)
  }
 })
}

const apiPost = (url, body, cb, headers) => {
 let options = {
  url: url,
  method: "POST",
  headers: {
   "content-type": "application/json",
   ...headers,
  },
  body: JSON.stringify(body),
 }
 request(options, (error, response, body) => {
  if (!error && body) {
   try {
    let bodyData = body ? JSON.parse(body) : { code: 500 }
    cb(null, bodyData)
   } catch (e) {
    cb({
     code: 500,
     message: body,
    })
   }
  } else {
   cb({
    code: 500,
    message: {
     body: "Hệ thống đang bận vui lòng thử lại sau",
    },
   })
  }
 })
}

const apiGet = (url, body, cb, headers) => {
 let options = {
  url: url,
  method: "GET",
  headers: {
   "content-type": "application/json",
   ...headers,
  },
 }
 request(options, (error, response, body) => {
  if (!error && body) {
   try {
    let bodyData = body ? JSON.parse(body) : { code: 500 }
    cb(null, bodyData)
   } catch (e) {
    console.log(e)
   }
  } else {
   cb({
    code: 500,
    message: {
     body: "Hệ thống đang bận vui lòng thử lại sau",
    },
   })
  }
 })
}

export { postApi, apiPost, apiGet }
