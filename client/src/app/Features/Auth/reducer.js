// Import All Auth Constants Type
import { USER_LOGIN, USER_LOGOUT } from "./constants";

//  Initial State from Cart Reducer
// Similar to useState but globally state
// Initial State is also saved in Local Storage
const initialState = localStorage.getItem("auth")
  ? JSON.parse(localStorage.getItem("auth"))
  : { user: null, token: null };

// Auth Reducer
export default function authReducer(state = initialState, { type, payload }) {
  // If dispatch of action triggers
  // State will be changed to the new state
  switch (type) {
    case USER_LOGIN:
      return { user: payload.user, token: payload.token };
    case USER_LOGOUT:
      return { user: null, token: null };
    // If no dispotch triggers, state will not be changed
    default:
      return state;
  }
}