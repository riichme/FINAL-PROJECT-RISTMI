// Fetch API using axios
import axios from "axios";

// import dotenv config
import { config } from "../../config";

export const getProducts = async (params) => {
  // Fetching API with method GET
  return axios.get(`${config.api_host}/api/products`, {params});
};
