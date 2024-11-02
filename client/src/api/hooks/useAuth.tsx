import { useMutation, useQuery } from "@tanstack/react-query";
import {
    getUser,
    login,
    logout,
    register,
    resetPassword,
    sendForgotPasswordMail,
    verifyEmail,
} from "../services/auth.service";
import { useNavigate } from "react-router-dom";

export const AUTH = "auth";

export function useAuth(opt = {}) {
    const { data: user, ...rest } = useQuery({
        queryKey: [AUTH],
        queryFn: getUser,
        staleTime: Infinity,
        ...opt,
    });
    return {
        user,
        ...rest,
    };
}

export function useLogin() {
    const navigate = useNavigate();
    return useMutation({
        mutationFn: login,
        onSuccess: () => {
            const pathname = localStorage.getItem("pathname");
            if (pathname) {
                navigate(pathname, {
                    replace: true,
                });
                localStorage.removeItem("pathname");
            } else {
                navigate("/", {
                    replace: true,
                });
            }
        },
    });
}

export function useRegister() {
    const navigate = useNavigate();
    return useMutation({
        mutationFn: register,
        onSuccess: () => {
            navigate("/");
        },
    });
}

export function useLogout() {
    return useQuery({
        queryKey: ["logout"],
        queryFn: logout,
        enabled: () => false,
    });
}

export function useVerifyEmail(code: string) {
    return useQuery({
        queryKey: ["verifyEmail", code],
        queryFn: verifyEmail,
    });
}

export function useSendForgotPasswordMail() {
    return useMutation({
        mutationFn: sendForgotPasswordMail,
    });
}

export function useResetPassword() {
    return useMutation({
        mutationFn: resetPassword,
    });
}
