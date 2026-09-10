import "server-only";
import type { ContactFormValues } from "./validation/contact-schema";

export class EmailNotConfiguredError extends Error {
  constructor() {
    super("E-mailprovider is niet geconfigureerd (EMAIL_PROVIDER_API_KEY ontbreekt).");
    this.name = "EmailNotConfiguredError";
  }
}

/**
 * Verstuurt het contactformulier via de Resend HTTP API. Kies bewust géén
 * SDK-dependency voor één simpele POST — vervang deze functie door een
 * andere provider (SMTP, Postmark, ...) zonder de rest van de app te raken.
 */
export async function sendContactEmail(values: Omit<ContactFormValues, "website">) {
  const apiKey = process.env.EMAIL_PROVIDER_API_KEY;
  const to = process.env.CONTACT_FORM_TO_EMAIL;
  const from = process.env.CONTACT_FORM_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    throw new EmailNotConfiguredError();
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to,
      reply_to: values.email,
      subject: `Nieuw contactformulier — ${values.subject}`,
      text: [
        `Naam: ${values.name}`,
        values.company ? `Bedrijf: ${values.company}` : null,
        `E-mail: ${values.email}`,
        values.phone ? `Telefoon: ${values.phone}` : null,
        `Onderwerp: ${values.subject}`,
        "",
        values.message,
      ]
        .filter(Boolean)
        .join("\n"),
    }),
  });

  if (!response.ok) {
    throw new Error(`E-mailprovider gaf status ${response.status} terug.`);
  }
}
