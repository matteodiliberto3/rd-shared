import { z } from "zod";

/** Client-side proprietary payment form — user-editable card / wallet id field only. */
export const CardPaymentSchema = z.object({
    cardNumber: z.string().min(8, "Numero di carta o ID Wallet non valido"),
});

export type CardPaymentValues = z.infer<typeof CardPaymentSchema>;
