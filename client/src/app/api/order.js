// Fetch API using axios
import axios from "axios";

// import dotenv config
import { config } from "../../config";

export async function getOrder(params) {
  // Get token from local storage
  let { token } = localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : {};

    // Get limit, page, and skip from params
  let { limit, page } = params;
  let { skip } = page * limit - limit;

  // Fetching API with method GET with params limit & skip and with headers bearer token
  return await axios.get(config.api_host + "/api/orders", {
    params: {
      skip,
      limit,
    },
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
}

export async function createOrder(payload) {
  // Get token from local storage
  let { token } = localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : {};

    // Fetching API with method POST and with headers bearer token
  return await axios.post(`${config.api_host}/api/orders`, payload, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
}
