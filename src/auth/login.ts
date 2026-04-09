import { z } from "zod";

/** POST /api/v1/auth/login — Google ID token from mobile (or compatible clients). */
export const LoginSchema = z.object({
    idToken: z.string().min(1, "idToken è obbligatorio"),
});

export type LoginInput = z.infer<typeof LoginSchema>;
