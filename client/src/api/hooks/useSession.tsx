import { useMutation, useQuery } from "@tanstack/react-query";
import {
    deleteSession,
    sessions as getSessions,
} from "../services/session.service";
import queryClient from "../client-config/queryClient";

export const SESSIONS = "sessions";

export function useSessions(opts = {}) {
    const { data: sessions, ...rest } = useQuery({
        queryKey: [SESSIONS],
        queryFn: getSessions,
        ...opts,
    });

    return { sessions, ...rest };
}

export function useDeleteSession() {
    return useMutation({
        mutationFn: deleteSession,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [SESSIONS],
            });
        },
    });
}
