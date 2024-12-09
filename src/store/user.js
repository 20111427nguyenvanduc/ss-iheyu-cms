// action - state management
import * as actionTypes from "./actions"

export const initialState = {}

// ===========================|| CUSTOMIZATION REDUCER ||=========================== //

const userReducer = (state = initialState, action) => {
 let id
 switch (action.type) {
  case actionTypes.SET_USER:
   const { payload } = action
   state = payload
   return state
  default:
   return state
 }
}

export default userReducer
