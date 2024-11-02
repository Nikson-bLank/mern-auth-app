import API from "../client-config/apiClient";
import { authEndpoints } from "../endpoints/auth.endpoint";
import { Credential, ResetCredential, User } from "../../types/auth.types";
import { QueryFunctionContext } from "@tanstack/react-query";

export const getUser = async (): Promise<User> => {
    return API.get(authEndpoints.user());
    // return response;
};

export const login = async (credential: Credential) => {
    const response = await API.post(authEndpoints.login(), credential);
    return response;
};

export const register = async (credential: Credential) => {
    const response = await API.post(authEndpoints.register(), credential);
    return response;
};

export const logout = async () => {
    const response = await API.get(authEndpoints.logout());
    return response;
};

export const verifyEmail = async ({
    queryKey,
}: QueryFunctionContext<[string, string]>) => {
    const code = queryKey[1];
    const response = await API.get(authEndpoints.verifyEmail(code));
    return response;
};

export const sendForgotPasswordMail = async (email: string) => {
    const response = await API.post(authEndpoints.forgotPassword(), { email });
    return response;
};

export const resetPassword = async ({
    verificationCode,
    password,
}: ResetCredential) => {
    const response = await API.post(authEndpoints.resetPassword(), {
        verificationCode,
        password,
    });
    return response;
};
