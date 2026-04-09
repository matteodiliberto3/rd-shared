import { z } from "zod";

/** Checkout / Stripe — idempotencyKey (UUID) required for server-side dedup. */
export const CheckoutOfferSchema = z.object({
    offerId: z.number().int().positive(),
    amountCents: z.number().int().positive(),
    quantity: z.number().int().positive().optional(),
    idempotencyKey: z.string().uuid(),
});

export type CheckoutOfferInput = z.infer<typeof CheckoutOfferSchema>;
