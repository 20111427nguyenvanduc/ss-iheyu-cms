import fs from "fs";
import request from "request";

const apiPost = (url, body, cb, headers) => {
  let options = {
    url: url,
    method: "POST",
    headers: {
      "content-type": "application/json",
      ...headers,
    },
    body: JSON.stringify(body),
  };
  request(options, (error, response, body) => {
    if (!error && body) {
      try {
        let bodyData = body ? JSON.parse(body) : { code: 500 };
        cb(null, bodyData);
      } catch (e) {
        cb({
          code: 500,
          message: body,
        });
      }
    } else {
      cb({
        code: 500,
        message: {
          body: "Hệ thống đang bận vui lòng thử lại sau",
        },
      });
    }
  });
};

const authPost = (url, req, res) => {
  const body = req.body;
  const headers = { token: _.get(req, "user.token") }; // Đính token vào header
  console.log('hahatoken: ',_.get(req, "user.token"));
  
  let options = {
    url: url,
    method: "POST",
    headers: {
      ...req.headers,
      ...headers,
    },
    body: JSON.stringify(body),
  };
  request(options, (error, response, body) => {
    try {
      let bodyData = typeof body !== "object" ? JSON.parse(body) : body ? body : { code: 300 };
      if (_.get(bodyData, "code") === 1993) {
        req.logout();
      }
      res.json(bodyData);
    } catch (e) {
      res.json({
        code: 500,
        message: {
          body: e.message,
        },
      });
    }
  });
};

const postFromData = (url, req, res) => {
  const headers = { token: _.get(req, "user.token") }; // Đính token vào header
  let file = _.get(req, "files.fileUpload.path", "");
  let formData = {
    ...req.body,
    folder: req.body.folder || "test2",
    fileUpload: {
      value: fs.readFileSync(file),
      options: {
        filename: "image.jpg",
      },
      ContentType: "image/jpeg",
      ContentDisposition: "inline",
    },
  };
  let options = {
    url,
    method: "POST",
    strictSSL: false,
    headers: {
      "content-type": "multipart/form-data",
      ...headers,
    },
    formData,
    json: true,
  };

  request(options, (error, response, body) => {
    try {
      let bodyData = typeof body !== "object" ? JSON.parse(body) : body ? body : { code: 300 };
      if (_.get(bodyData, "code") === 1993) {
        req.logout();
      }
      res.json(bodyData);
    } catch (e) {
      res.json({
        code: 500,
        message: {
          body: e.message,
        },
      });
    }
  });
};

export { apiPost, authPost, postFromData };
