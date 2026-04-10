import { z } from "zod";
import { PAYMENT_PROVIDERS } from "../common/constants";

export const CreatePaymentIntentSchema = z.object({
    bookingId: z.number().int().positive(),
    provider: z.enum(PAYMENT_PROVIDERS),
    quantity: z.number().int().positive().optional(),
});

export const ProcessProprietaryPaymentSchema = z.object({
    reference: z.string().min(1),
    cardNumber: z.string().min(8, "Numero di carta o ID Wallet non valido"),
});

export const GenerateQrSchema = z.object({
    bookingId: z.number().int().positive(),
});

export const ValidateQrSchema = z.object({
    token: z.string().min(1),
});

export const InvalidateQrSchema = ValidateQrSchema;

export const InvalidateUnredeemedForOfferSchema = z.object({
    offerId: z.number().int().positive(),
});

export type CreatePaymentIntentInput = z.infer<typeof CreatePaymentIntentSchema>;
export type ProcessProprietaryPaymentInput = z.infer<typeof ProcessProprietaryPaymentSchema>;
export type GenerateQrInput = z.infer<typeof GenerateQrSchema>;
export type ValidateQrInput = z.infer<typeof ValidateQrSchema>;
export type InvalidateQrInput = z.infer<typeof InvalidateQrSchema>;
export type InvalidateUnredeemedForOfferInput = z.infer<typeof InvalidateUnredeemedForOfferSchema>;
