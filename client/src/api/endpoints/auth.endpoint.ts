export const authEndpoints = {
    user: () => `/user`,
    login: () => `/auth/login`,
    register: () => `/auth/register`,
    refresh: () => `/auth/refresh`,
    logout: () => `auth/logout`,
    verifyEmail: (code: string) => `/auth/email/verify/${code}`,
    forgotPassword: () => `/auth/password/forgot`,
    resetPassword: () => `/auth/password/reset`,
};
