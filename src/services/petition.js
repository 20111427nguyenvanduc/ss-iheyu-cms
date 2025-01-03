import axios from "./axios";

export const list = (body = {}) => {
 return axios.post("/admin/petition/list", body)
}

export const listForIndividual = (body = {}) => {
 return axios.post("/admin/petition/list-for-individual", body)
}
