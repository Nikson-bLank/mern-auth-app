export type Credential = {
    email: string;
    password: string;
};

export type ResetCredential = {
    password: string;
    verificationCode: string;
};

export type User = {
    _id: string;
    email: string;
    verified: boolean;
    createdAt: Date;
};
