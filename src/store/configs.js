// action - state management
import * as actionTypes from "./actions"
import { saveState } from "./localStore"

export const initialState = {
 region: "",
 regions: [],
}

// ===========================|| CUSTOMIZATION REDUCER ||=========================== //

const customizationReducer = (state = initialState, action) => {
 switch (action.type) {
  case actionTypes.SET_REGION:
   state = {
    ...state,
    region: action.payload,
   }
   break
   case actionTypes.SET_REGIONS:
   state = {
    ...state,
    regions: action.payload,
   }
   break
  case actionTypes.SET_ORDER_TYPES:
    console.log(action.type, action.payload);
   state = {
    ...state,
    orderTypes: action.payload,
   }
   break
  default:
   return state
 }
 saveState("configs", state)
 return {
  ...state,
 }
}

export default customizationReducer
