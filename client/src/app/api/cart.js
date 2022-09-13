// Fetch API using axios
import axios from "axios";

// import dotenv config
import { config } from "../../config";

// import action setItems from cart
import { setItems } from "../Features/Cart/actions";

// import store
import store from "../store";

export async function saveCart(token, cart) {
  // Fetching API with method PUT with headers bearer token
  return await axios.put(
    `${config.api_host}/api/carts/`,
    { items: cart },
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
}

export async function getCart() {
  // Get token from local storage 
  const { token } = localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : {};
  if (!token) return;

  // Fetching API with method GET with headers bearer token
  // And get data
  const { data } = await axios.get(`${config.api_host}/api/carts/`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  // If fetching success
  if (!data.error) {
    store.dispatch(setItems(data));
    localStorage.setItem("cart", JSON.stringify(data));
  }
}
