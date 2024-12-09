import axios from "./axios"

export const login = (body = {}) => {
 return axios.post("/login", body)
}

export const logout = (body = {}) => {
 return axios.post("/logout", body)
}

export const changePassword = (body = {}) => {
 return axios.post("/api/app/change-password", body)
}

export const getUserInf = (body = {}) => {
 return axios.post("/api/app/user-inf", body)
}
