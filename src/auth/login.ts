import { z } from "zod";

/** POST /api/v1/auth/google — Google ID token from mobile Google Sign-In. */
export const GoogleLoginSchema = z.object({
    idToken: z.string().min(1, "idToken è obbligatorio"),
});

export type GoogleLoginInput = z.infer<typeof GoogleLoginSchema>;

/** @deprecated Use GoogleLoginSchema. Kept for backward compatibility. */
export const LoginSchema = GoogleLoginSchema;
export type LoginInput = GoogleLoginInput;
