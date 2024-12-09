import axios from './axios'

export const lectureList = (body) => {
  let url = '/api/lecture/list';
  return axios.post(url, body)
}
export const lectureAdd = (body) => {
  let url = '/api/lecture/add';
  return axios.post(url, body)
}
export const lectureModify = (body) => {
  let url = '/api/lecture/modify';
  return axios.post(url, body)
}
export const lectureInActive = (body) => {
  let url = '/api/lecture/inactive';
  return axios.post(url, body)
}
export const lectureArrange = (body) => {
  let url = '/api/lecture/arrange';
  return axios.post(url, body)
}
export const testList = (body) => {
  let url = '/api/test/list';
  return axios.post(url, body)
}
export const testAdd = (body) => {
  let url = '/api/test/add';
  return axios.post(url, body)
}
export const testModify = (body) => {
  let url = '/api/test/modify';
  return axios.post(url, body)
}
export const testInActive = (body) => {
  let url = '/api/test/inactive';
  return axios.post(url, body)
}
export const testArrange = (body) => {
  let url = '/api/test/arrange';
  return axios.post(url, body)
}
export const answerAdd = (body) => {
  let url = '/api/answer/add';
  return axios.post(url, body)
}
export const answerModify = (body) => {
  let url = '/api/answer/modify';
  return axios.post(url, body)
}
