import axios from "./axios"

export const placeAutocomplete = (body = {}) => {
 return axios.post("/api/location/place-autocomplete", body)
}

export const placeDetail = (body = {}) => {
 return axios.post("/api/location/place-detail", body)
}
