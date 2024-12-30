import axios from "./axios"

export const list = (body = {}) => {
 return axios.post("/admin/category-permission/list", body)
}
