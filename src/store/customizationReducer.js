// action - state management
import * as actionTypes from "./actions"
import { saveState } from "./localStore"
export const initialState = {
 isOpen: [], // for active default menu
 fontFamily: `'Roboto', sans-serif`,
 fontSize: 16,
 opened: true,
 mode: "light",
}

// ===========================|| CUSTOMIZATION REDUCER ||=========================== //

const customizationReducer = (state = initialState, action) => {
 let id
 switch (action.type) {
  case actionTypes.SET_MODE:
   state.mode = action.mode
   break
  case actionTypes.SET_MENU:
   state.opened = action.opened
   break
  default:
   return state
 }
 saveState("customization", state)
 return {
  ...state,
 }
}

export default customizationReducer
