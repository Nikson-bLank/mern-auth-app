import axios from "axios";
import { authEndpoints } from "../endpoints/auth.endpoint";
import queryClient from "./queryClient";

const options = {
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
};

const API = axios.create(options);

const RefreshTokenClient = axios.create(options);

RefreshTokenClient.interceptors.response.use((response) => response.data);

API.interceptors.response.use(
    (response) => response.data,
    async (error) => {
        const { response, config } = error;
        const errorCode = response.data.errorCode;
        const status = response.status;
        if (status === 401 && errorCode === "InvalidAccessToken") {
            try {
                await RefreshTokenClient.get(authEndpoints.refresh());
                return RefreshTokenClient(config);
            } catch (error) {
                queryClient.clear();
                console.error(error);
                window.location.href = "/sign-in";
                localStorage.setItem("pathname", window.location.pathname);
            }
        }
        return Promise.reject({ status, ...response.data });
    }
);

export default API;
