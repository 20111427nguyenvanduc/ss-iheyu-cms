import { combineReducers } from "redux"

// reducer import
import customizationReducer from "./customizationReducer"
import configs from "./configs"
import user from "./user"

// ===========================|| COMBINE REDUCER ||=========================== //

const reducer = combineReducers({
 customization: customizationReducer,
 user,
 configs,
})

export default reducer
