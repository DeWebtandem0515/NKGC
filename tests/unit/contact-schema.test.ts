import { describe, expect, it } from "vitest";
import { contactSchema } from "@/lib/validation/contact-schema";

const validPayload = {
  name: "Jan Jansen",
  company: "Melkveebedrijf Jansen",
  email: "jan@example.com",
  phone: "0612345678",
  subject: "herdTreatment",
  message: "Ik zou graag een koppelbehandeling willen bespreken.",
  website: "",
};

describe("contactSchema", () => {
  it("accepteert een volledig, geldig formulier", () => {
    expect(contactSchema.safeParse(validPayload).success).toBe(true);
  });

  it("wijst een ongeldig e-mailadres af", () => {
    const result = contactSchema.safeParse({ ...validPayload, email: "geen-email" });
    expect(result.success).toBe(false);
  });

  it("wijst een te kort bericht af", () => {
    const result = contactSchema.safeParse({ ...validPayload, message: "kort" });
    expect(result.success).toBe(false);
  });

  it("wijst een onbekend onderwerp af", () => {
    const result = contactSchema.safeParse({ ...validPayload, subject: "iets-anders" });
    expect(result.success).toBe(false);
  });

  it("laat een ingevulde honeypot door de validatie heen (afhandeling gebeurt in de API-route)", () => {
    // Het schema moet een ingevulde honeypot niet met een 400 afwijzen —
    // anders verraadt de server aan een bot dat het spamveld is opgemerkt.
    // De route (niet het schema) beslist stilzwijgend "doe alsof het lukte".
    const result = contactSchema.safeParse({ ...validPayload, website: "http://spam.example" });
    expect(result.success).toBe(true);
  });

  it("staat een lege bedrijfsnaam toe (optioneel veld)", () => {
    const result = contactSchema.safeParse({ ...validPayload, company: "" });
    expect(result.success).toBe(true);
  });
});
