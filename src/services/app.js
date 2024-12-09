import axios from "./axios"

export const getRegion = (body = {}) => {
 return axios.post("/api/app/get-region", body)
}

export const getCMSConfig = (body = {}) => {
 return axios.post("/api/config/get-cms-config", body)
}
