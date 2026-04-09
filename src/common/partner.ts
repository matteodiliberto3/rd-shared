import { z } from "zod";

export const SubmitPartnerSchema = z.object({
    nome: z.string().min(2, "Il nome deve avere almeno 2 caratteri").max(100),
    piva: z
        .string()
        .length(11, "La Partita IVA deve contenere esattamente 11 cifre")
        .regex(/^\d+$/, "La Partita IVA deve contenere solo cifre"),
    indirizzo: z.string().min(5, "L'indirizzo è troppo corto").max(255),
});

export type SubmitPartnerInput = z.infer<typeof SubmitPartnerSchema>;
