// Import All Cart Constants Type
import { DEC, INC, SET_NULL } from "./constants"

//  Initial State from Counter Reducer
// Similar to useState but globally state
let initialState = {
    cartCount: 0
}

// Counter Reducer
const counterReducer = (state = initialState, action) => {
    switch(action.type){
        case INC:
            return {
                ...state,
                cartCount: state.cartCount + action.cartCount
            }
        case DEC:
            return {
                ...state,
                cartCount: state.cartCount - action.cartCount
            }
        case SET_NULL: 
            return {
                ...state,
                cartCount: 0
            }
        default:
            return state
    }
}

export default counterReducer;