import axios from "./axios"

export const list = (body = {}) => {
 return axios.post("/api/caregiver/list", body)
}

export const updateAuthen = (body = {}) => {
 return axios.post("/api/caregiver/authen-update", body)
}
