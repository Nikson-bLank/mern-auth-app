import { useMutation } from "@tanstack/react-query";
import { login } from "../services/auth.service";
import { useNavigate } from "react-router-dom";

export function useLogin() {
    const navigate = useNavigate();
    return useMutation({
        mutationFn: login,
        onSuccess: () => {
            navigate("/");
        },
    });
}
