import axios from "./axios"

export const login = (body = {}) => {
 return axios.post("/login", body)
}

export const logout = (body = {}) => {
 return axios.post("/logout", body)
}

export const getUserInf = (body) => {
 return axios.post("/user-inf", body)
}
