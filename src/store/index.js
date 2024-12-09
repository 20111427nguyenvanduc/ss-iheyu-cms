import { createStore } from "redux"
import reducer from "./reducer"
import { loadState } from "./localStore"
const initialState = {
 customization: loadState("customization"),
 configs: loadState("configs"),
}
// ===========================|| REDUX - MAIN STORE ||=========================== //

const store = createStore(reducer, initialState)

export { store }
