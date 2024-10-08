function getEnv(key: string, defaultValue?: string) {
    const value = process.env[key] || defaultValue;

    if (value === undefined) {
        throw new Error(`Environment variable ${key} is missing`);
    }

    return value;
}

export default getEnv;
