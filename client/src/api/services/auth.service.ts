import API from "../client-config/apiClient";
import { authEndpoints } from "../endpoints/auth.endpoint";
import { Credential } from "../../types/auth.types";

export const login = async (credential: Credential) => {
    const response = await API.post(authEndpoints.login(), credential);
    return response;
};
