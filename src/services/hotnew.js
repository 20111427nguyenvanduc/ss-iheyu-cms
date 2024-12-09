import axios from "./axios"

export const list = (body = {}) => {
 return axios.post("/api/hot-news/list", body)
}

export const create = (body = {}) => {
 return axios.post("/api/hot-news/create", body)
}

export const update = (body = {}) => {
 return axios.post("/api/hot-news/update", body)
}

export const notificationList = (body = {}) => {
    return axios.post("/api/hot-news/notification-list", body)
   }