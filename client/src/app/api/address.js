// Fetch API using axios
import axios from "axios";

// import dotenv config
import { config } from "../../config";

export async function getAddress(params) {
  // Get token from local storage 
  let { token } = localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : {};

  // Fetching API with method GET with params limit & skip and with headers bearer token
  return await axios.get(`${config.api_host}/api/delivery-addresses`, {
    params: {
      limit: params.limit,
      skip: params.page * params.limit - params.limit,
    },
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
}

export async function createAddress(payload) {
  // Get token from local storage 
  let { token } = localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : {};

  // Fetching API with method POST with headers bearer token
  return await axios.post(`${config.api_host}/api/delivery-addresses`, payload, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
}
