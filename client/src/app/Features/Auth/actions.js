// Import Types of Action (constants)
import { USER_LOGIN, USER_LOGOUT } from "./constants";

// Actions
// Actions are process from dispatch (if there's event handler triggered) to reducer
export const userLogin = (payload) => ({
  type: USER_LOGIN,
  payload,
});
export const userLogout = () => ({
  type: USER_LOGOUT,
});