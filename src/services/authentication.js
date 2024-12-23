import axios from "./axios"

export const login = (body = {}) => {
 return axios.post("/login", body)
}

export const forgotPassword = (body = {}) => {
 return axios.post("/forgot-password", body)
}

export const changePassword = (body = {}) => {
 return axios.post("/change-password", body)
}

export const logout = (body = {}) => {
 return axios.post("/logout", body)
}

export const getUserInf = (body) => {
 return axios.post("/user-inf", body)
}
