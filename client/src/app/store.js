// Import dependecies from redux
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";

// Import all reducers from folder Features
import authReducer from "./Features/Auth/reducer";
import cartReducer from "./Features/Cart/reducer";
import counterReducer from "./Features/Counter/reducer";
import productReducer from "./Features/Product/reducer";

// All reducers will be combine and be saved in store
let rootReducers = combineReducers({
    counter: counterReducer,
    product: productReducer,
    auth: authReducer,
    cart: cartReducer
})

// Integrate compose with redux devtools extension from browser
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Make Store
// Redux Thunk is middleware that allows you to return functions, rather than just actions, within Redux. This allows for delayed actions, including working with promises.
let store = createStore(rootReducers, composeEnhancers(applyMiddleware(thunk)));

// export store to index.js
export default store;