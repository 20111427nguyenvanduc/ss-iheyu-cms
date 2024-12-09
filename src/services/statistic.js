import axios from "./axios"

export const revenue = (body = {}) => {
 return axios.post("/api/statistic/revenue", body)
}
export const statisticJob = (body = {}) => {
 return axios.post("/api/statistic/statistic-job", body)
}
export const revenueClean = (body = {}) => {
 return axios.post("/api/statistic/revenue-clean", body)
}
export const statisticJobClean = (body = {}) => {
 return axios.post("/api/statistic/statistic-clean", body)
}
