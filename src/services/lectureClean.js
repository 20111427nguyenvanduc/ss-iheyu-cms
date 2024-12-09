import axios from './axios'

export const lectureList = (body) => {
  let url = '/api/lecture-clean/list';
  return axios.post(url, body)
}
export const lectureAdd = (body) => {
  let url = '/api/lecture-clean/add';
  return axios.post(url, body)
}
export const lectureModify = (body) => {
  let url = '/api/lecture-clean/modify';
  return axios.post(url, body)
}
export const lectureInActive = (body) => {
  let url = '/api/lecture-clean/inactive';
  return axios.post(url, body)
}
export const lectureArrange = (body) => {
  let url = '/api/lecture-clean/arrange';
  return axios.post(url, body)
}
export const testList = (body) => {
  let url = '/api/test-clean/list';
  return axios.post(url, body)
}
export const testAdd = (body) => {
  let url = '/api/test-clean/add';
  return axios.post(url, body)
}
export const testModify = (body) => {
  let url = '/api/test-clean/modify';
  return axios.post(url, body)
}
export const testInActive = (body) => {
  let url = '/api/test-clean/inactive';
  return axios.post(url, body)
}
export const testArrange = (body) => {
  let url = '/api/test-clean/arrange';
  return axios.post(url, body)
}
export const answerAdd = (body) => {
  let url = '/api/answer-clean/add';
  return axios.post(url, body)
}
export const answerModify = (body) => {
  let url = '/api/answer-clean/modify';
  return axios.post(url, body)
}
