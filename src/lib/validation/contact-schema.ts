import { z } from "zod";

export const CONTACT_SUBJECTS = [
  "herdTreatment",
  "advice",
  "education",
  "vacancy",
  "other",
] as const;

/**
 * Gedeeld schema voor client- én server-side validatie van het
 * contactformulier. `website` is een honeypot-veld: onzichtbaar voor mensen,
 * aantrekkelijk voor eenvoudige spambots — moet altijd leeg blijven.
 */
export const contactSchema = z.object({
  name: z.string().trim().min(2).max(100),
  company: z.string().trim().max(150).optional().or(z.literal("")),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  subject: z.enum(CONTACT_SUBJECTS),
  message: z.string().trim().min(10).max(2000),
  // Mag een waarde bevatten (dat is precies hoe we een bot herkennen) — de
  // afhandeling ("doe alsof het gelukt is, verstuur niets") gebeurt in de
  // API-route, niet hier. Zou dit veld hier al worden afgewezen, dan kreeg
  // een bot een expliciete 400 terug in plaats van een onopvallende 200.
  website: z.string().max(500).optional().or(z.literal("")),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
