import request from "request"

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

const authPost = (url, req, res) => {
 const body = req.body
    const headers = { token: _.get(req, "user.token") } // Đính token vào header
    console.log("hahatoken",_.get(req, "user.token"));
    
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
  if (body) {
   try {
    let bodyData = body ? JSON.parse(body) : { code: 500 }
    if (_.get(bodyData, "code") === 1993) {
     req.logout()
    }
    res.json(bodyData)
   } catch (e) {
    res.json({
     code: 500,
     message: body,
    })
   }
  } else {
   res.json({
    code: 500,
    message: {
     body: "Hệ thống đang bận vui lòng thử lại sau",
    },
   })
  }
 })
}
export { apiPost, apiGet, authPost }
