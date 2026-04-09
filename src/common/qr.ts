import { z } from "zod";

/** Signed QR payload (booking id, restaurant id, expiry epoch). */
export const QrPayloadSchema = z.object({
    bId: z.number(),
    rId: z.number(),
    exp: z.number(),
});

export type QrPayload = z.infer<typeof QrPayloadSchema>;
