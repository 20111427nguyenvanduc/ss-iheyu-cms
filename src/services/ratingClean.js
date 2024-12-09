import axios from "./axios"
import CONSTANT from "../const"

export const getListRating = (from) => {
 let postData = {
  from: from,
 }
 let url = "/api/rating-clean/get-list"
 return axios.post(url, postData)
}

export const getRatingInf = (idSource) => {
 let api = "/api/rating-clean/get-inf"
 let postData = {
  id: idSource,
 }
 return axios.post(api, postData)
}

export const getRatingByPhone = (phone) => {
 let postData = {
  phone: phone,
 }

 let url = "/api/rating-clean/search-by-phone"
 return axios.post(url, postData)
}

export const registerRating = (recordId, userID) => {
 let postData = {
  id: recordId,
  userId: userID,
 }
 let url = "/api/rating-clean/register"

 return axios.post(url, postData)
}
export const approveRating = (id, status) => {
 let postData = {
  id,
  status,
 }
 let url = "/api/rating-clean/approve"

 return axios.post(url, postData)
}
