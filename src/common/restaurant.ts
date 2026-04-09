import { z } from "zod";

const HH_MM = /^([01]\d|2[0-3]):[0-5]\d$/;

export const UpdateRestaurantSchema = z
    .object({
        nome: z
            .string()
            .min(2, "Il nome deve avere almeno 2 caratteri")
            .max(100, "Max 100 caratteri"),
        indirizzo: z
            .string()
            .min(5, "L'indirizzo è troppo corto")
            .max(255, "Max 255 caratteri"),
        bio: z.string().max(500, "Max 500 caratteri").optional(),
        linkGoogle: z.string().optional(),
        orariApertura: z.string().optional(),
        orariChiusura: z.string().optional(),
    })
    .superRefine((data, ctx) => {
        const link = data.linkGoogle?.trim();
        if (link) {
            try {
                const host = new URL(link).hostname.toLowerCase();
                const isGoogleHost = host === "google.com" || host.endsWith(".google.com");
                const isGooGlHost = host === "goo.gl" || host.endsWith(".goo.gl");
                if (!isGoogleHost && !isGooGlHost) {
                    ctx.addIssue({
                        code: "custom",
                        message: "Inserisci un link Google Maps valido",
                        path: ["linkGoogle"],
                    });
                }
            } catch {
                ctx.addIssue({
                    code: "custom",
                    message: "Inserisci un URL valido (https://...)",
                    path: ["linkGoogle"],
                });
            }
        }

        const a = data.orariApertura?.trim() ?? "";
        const c = data.orariChiusura?.trim() ?? "";
        if (a && !HH_MM.test(a)) {
            ctx.addIssue({
                code: "custom",
                message: "Formato HH:mm",
                path: ["orariApertura"],
            });
        }
        if (c && !HH_MM.test(c)) {
            ctx.addIssue({
                code: "custom",
                message: "Formato HH:mm",
                path: ["orariChiusura"],
            });
        }
        if ((a && !c) || (!a && c)) {
            ctx.addIssue({
                code: "custom",
                message:
                    "Inserisci sia orario di apertura sia di chiusura, oppure lascia entrambi vuoti.",
                path: ["orariChiusura"],
            });
        }
    });

export type UpdateRestaurantInput = z.infer<typeof UpdateRestaurantSchema>;
