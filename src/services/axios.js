import axios from "axios";
import toastr from "toastr";
import _ from "lodash";

axios.interceptors.request.use(
  (request) => {
    // Do something before request is sent
    if (!request.data) {
      request.data = {};
    }
    return request;
  },
  function (error) {
    // Do something with request error
    toastr.error(_.get(error, "message"));
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    const code = _.get(response, "data.code");
    let message = _.get(response, "data.message");
    if (typeof message === "string") {
      message = {
        head: "Thông báo",
        body: message,
      };
    }
    if (!_.isEmpty(message)) {
      switch (code) {
        case 200:
          toastr.success(_.get(message, "body"), _.get(message, "head"));
          break;
        case 300:
        case 301:
        case 302:
        case 303:
        case 304:
          toastr.error(_.get(message, "body"), _.get(message, "head"));
          break;
        case 201:
        case 202:
        case 203:
        case 209:
        case 400:
        case 401:
        case 402:
        case 403:
        case 404:
          toastr.warning(_.get(message, "body"), _.get(message, "head"));
          break;
        case 500:
        case 501:
        case 502:
        case 503:
        case 504:
          toastr.error(_.get(message, "body"), _.get(message, "head"));
          break;
        case 1993:
          document.location.href = "/login";
        default:
          toastr.info(_.get(message, "body"), _.get(message, "head"));
          break;
      }
    }

    return _.get(response, "data");
  },
  function (error) {
    // Do something with response error
    toastr.error(_.get(error, "message"));
    return Promise.reject(error);
  }
);

export default axios;
