import bcrypt from "bcrypt";

export const hashValue = (value: string, salt?: number) => {
    return bcrypt.hash(value, salt || 10);
};

export const compareValue = (value: string, hashedValue: string) => {
    return bcrypt.compare(value, hashedValue).catch(() => false);
};
