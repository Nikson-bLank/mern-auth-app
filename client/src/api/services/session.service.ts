import { Session } from "../../types/session.types";
import API from "../client-config/apiClient";
import { sessionEndpoints } from "../endpoints/session.endpoint";

export const sessions = async (): Promise<Session[]> => {
    return API.get(sessionEndpoints.sessions());
    // return response;
};
export const deleteSession = async (id: string) => {
    const response = await API.delete(sessionEndpoints.deleteSession(id));
    return response;
};
