import { z } from "zod";

export const OfferSchema = z.object({
    restaurantId: z.number(),
    titolo: z.string().min(3, "Titolo troppo breve").max(100),
    descrizione: z.string().max(1000, "Descrizione troppo lunga"),
    tipo: z.enum(["PRODUCT", "TIME_SLOT"]),
    // Cents-first: integer cents expected at API boundary (e.g. 999 = €9.99)
    prezzoOriginale: z.number().int().positive(),
    prezzoScontato: z.number().int().positive(),
    disponibilita: z.number().int().min(1).default(1),
    data: z.union([z.string(), z.date()]),
    fasciaOraria: z.string().min(1, "Fascia oraria obbligatoria"),
    images: z.array(z.string()).max(3).optional(),
});

export type CreateOfferInput = z.infer<typeof OfferSchema>;

// ─── UI Form schema (react-hook-form layer) ──────────────────────────────────
// Prices are euro strings (e.g. "12,50"), converted to cents in the server action.
// Timing has two modes: simple (date + duration) or range (datetime start/end).

export const CreateOfferFormSchema = z
    .object({
        titolo: z.string().min(3, "Almeno 3 caratteri").max(100, "Max 100 caratteri"),
        descrizione: z.string().max(500, "Max 500 caratteri").optional(),
        tipo: z.enum(["PRODUCT", "TIME_SLOT"]),
        disponibilita: z.number().int().min(1, "Almeno 1 posto").max(999),
        prezzoOriginale: z
            .string()
            .min(1, "Inserisci il prezzo")
            .regex(/^\d+([.,]\d{1,2})?$/, "Formato: 12 oppure 12,50")
            .refine(
                (v) => parseFloat(v.replace(",", ".")) > 0,
                "Il prezzo deve essere maggiore di zero",
            ),
        scontoPercent: z.number().int("Percentuale intera").min(1, "Min 1%").max(99, "Max 99%"),
        timingMode: z.enum(["simple", "range"]),
        // simple mode: date + start time + duration
        data: z.string().optional(),
        oraInizio: z.string().optional(),
        durataNumerica: z.number().positive().max(1440, "Durata massima: 24 ore").optional(),
        durataUnita: z.enum(["min", "ore"]).optional(),
        // range mode: start and end datetime-local
        dataInizio: z.string().optional(),
        dataFine: z.string().optional(),
    })
    .superRefine((val, ctx) => {
        if (val.timingMode === "simple") {
            if (!val.data)
                ctx.addIssue({ code: "custom", path: ["data"], message: "Data obbligatoria" });
            if (!val.oraInizio)
                ctx.addIssue({
                    code: "custom",
                    path: ["oraInizio"],
                    message: "Ora di inizio obbligatoria",
                });
            if (!val.durataNumerica || val.durataNumerica < 1)
                ctx.addIssue({
                    code: "custom",
                    path: ["durataNumerica"],
                    message: "Inserisci la durata",
                });
        } else {
            if (!val.dataInizio)
                ctx.addIssue({
                    code: "custom",
                    path: ["dataInizio"],
                    message: "Data inizio obbligatoria",
                });
            if (!val.dataFine)
                ctx.addIssue({ code: "custom", path: ["dataFine"], message: "Data fine obbligatoria" });
            if (val.dataInizio && val.dataFine && val.dataFine <= val.dataInizio)
                ctx.addIssue({
                    code: "custom",
                    path: ["dataFine"],
                    message: "La fine deve essere dopo l'inizio",
                });
        }
    });

export type CreateOfferFormValues = z.infer<typeof CreateOfferFormSchema>;
