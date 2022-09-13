// Import Store
import store from "../store";
// Import saveCart API
import { saveCart } from "../api/cart";

// Adds a change listener. It will be called any time an action is dispatched, and some part of the state tree may potentially have changed.
// Listener consist of config from local storage, then comparing it with global state
// In this case Auth, Cart and Counter

// initialize current of auth, cart & counter
let currentAuth;
let currentCart;
let currentCounter;

const listener = () => {
    // First, the value of previous state is current state
    let previousAuth = currentAuth;
    let previousCart = currentCart;
    let previousCounter = currentCounter;

    // The current state has value of global state
    currentAuth = store.getState().auth;
    currentCart = store.getState().cart;
    currentCounter = store.getState().counter;

    // Initialize Token from Auth
    const { token } = currentAuth;
    // If the auth of global state is not same as previous state
    if (currentAuth !== previousAuth) {
        // Creating Local Storage with Key "auth" and Value of auth global state
        localStorage.setItem("auth", JSON.stringify(currentAuth));
    }
    
    // If the cart of global state is not same as previous cart
    if (currentCart !== previousCart) {
        // Creating Local Storage with Key "cart" and Value of cart global state
        localStorage.setItem("cart", JSON.stringify(currentCart));
        // Update Cart by Token Bearer
        saveCart(token, currentCart);
    }

    // If the counter of global state is not same as previous counter
    if (currentCounter !== previousCounter) {
        // Creating Local Storage with Key "counter" and Value of counter global state
        localStorage.setItem("counter", JSON.stringify(currentCounter));
    }
}

// Export listen to App.js
export const listen = () => {
    store.subscribe(listener);
};

