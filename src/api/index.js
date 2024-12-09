import request from "request"

const post = (url, body, cb, headers) => {
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

const get = (url, body, cb, headers) => {
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
