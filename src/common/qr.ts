import { z } from "zod";

/** Signed QR payload (booking id, restaurant id). Legacy tokens may include `exp` (ignored). */
export const QrPayloadSchema = z.object({
    bId: z.number(),
    rId: z.number(),
    exp: z.number().optional(),
});

export type QrPayload = z.infer<typeof QrPayloadSchema>;
