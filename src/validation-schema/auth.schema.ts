import z from "zod";

const emailSchema = z.string().email().min(1).max(255);
const passwordSchema = z.string().min(6).max(255);

// export const loginSchema = z.object({
//     email: emailSchema,
//     password: passwordSchema,
//     userAgent: z.string().optional(),
// });

// export const registerSchema = z.object({
//     email: emailSchema,
//     password: passwordSchema,
//     userAgent: z.string().optional(),
// });

export const authSchema = z.object({
    email: emailSchema,
    password: passwordSchema,
    userAgent: z.string().optional(),
});

export const verificationCodeSchema = z.string().min(1).max(24);
