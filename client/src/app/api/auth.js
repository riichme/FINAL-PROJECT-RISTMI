// Fetch API using axios
import axios from "axios";

// import dotenv config
import { config } from "../../config";

export const registerUser = async (data) => {
    // Fetching API with method GET
    return await axios.post(`${config.api_host}/auth/register`, data);
};

export const loginUser = async (data) => {
    // Fetching API with method POST
    return await axios.post(`${config.api_host}/auth/login`, data);
};

export const logoutUser = async () => {
    // Get token from local storage 
    let { token } = localStorage.getItem("auth")
        ? JSON.parse(localStorage.getItem("auth"))
        : {};

        // Fetching API with method POST with headers bearer token
    return await axios
        .post(`${config.api_host}/auth/logout`, null, {
            headers: {
                authorization: `Bearer ${token}`,
            },
        })
        // If success, remove token from local storage
        .then((res) => {
            localStorage.removeItem("auth");
            return res;
        });
};
