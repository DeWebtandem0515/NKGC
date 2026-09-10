"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import clsx from "clsx";
import {
  CONTACT_SUBJECTS,
  contactSchema,
  type ContactFormValues,
} from "@/lib/validation/contact-schema";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const t = useTranslations("contact.form");
  const [status, setStatus] = useState<Status>("idle");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      company: "",
      email: "",
      phone: "",
      subject: undefined,
      message: "",
      website: "",
    },
  });

  async function onSubmit(values: ContactFormValues) {
    setStatus("submitting");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!response.ok) throw new Error("request_failed");
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  }

  const inputClasses =
    "w-full rounded-xl border border-nkgc-sand-200 bg-white px-4 py-3 text-[15px] text-nkgc-blue-900 placeholder:text-nkgc-blue-300 focus:border-nkgc-green-600";

  if (status === "success") {
    return (
      <div role="status" className="rounded-card bg-nkgc-green-50 p-8 ring-1 ring-nkgc-green-200">
        <h3 className="text-lg font-bold text-nkgc-blue-900">{t("successHeading")}</h3>
        <p className="mt-2 text-[15px] text-nkgc-blue-700">{t("successBody")}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      {/* Honeypot: verborgen voor mensen, aantrekkelijk voor eenvoudige bots */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">{t("honeypotLabel")}</label>
        <input id="website" type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-nkgc-blue-800">
            {t("name")}
          </label>
          <input id="name" type="text" className={inputClasses} {...register("name")} />
          {errors.name && <FieldError>{t("requiredField")}</FieldError>}
        </div>
        <div>
          <label htmlFor="company" className="mb-1.5 block text-sm font-medium text-nkgc-blue-800">
            {t("company")}
          </label>
          <input id="company" type="text" className={inputClasses} {...register("company")} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-nkgc-blue-800">
            {t("email")}
          </label>
          <input id="email" type="email" className={inputClasses} {...register("email")} />
          {errors.email && <FieldError>{t("invalidEmail")}</FieldError>}
        </div>
        <div>
          <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-nkgc-blue-800">
            {t("phone")}
          </label>
          <input id="phone" type="tel" className={inputClasses} {...register("phone")} />
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="mb-1.5 block text-sm font-medium text-nkgc-blue-800">
          {t("subject")}
        </label>
        <select
          id="subject"
          defaultValue=""
          className={clsx(inputClasses, "appearance-none bg-white")}
          {...register("subject")}
        >
          <option value="" disabled>
            {t("subjectPlaceholder")}
          </option>
          {CONTACT_SUBJECTS.map((subject) => (
            <option key={subject} value={subject}>
              {t(`subjectOptions.${subject}`)}
            </option>
          ))}
        </select>
        {errors.subject && <FieldError>{t("requiredField")}</FieldError>}
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-nkgc-blue-800">
          {t("message")}
        </label>
        <textarea
          id="message"
          rows={5}
          className={inputClasses}
          {...register("message")}
        />
        {errors.message && <FieldError>{t("tooShort", { min: 10 })}</FieldError>}
      </div>

      {status === "error" && (
        <div role="alert" className="rounded-xl bg-red-50 p-4 text-sm text-red-800 ring-1 ring-red-200">
          <p className="font-semibold">{t("errorHeading")}</p>
          <p className="mt-1">{t("errorBody")}</p>
        </div>
      )}

      <button type="submit" disabled={status === "submitting"} className="btn-primary w-full sm:w-auto">
        {status === "submitting" ? t("submitting") : t("submit")}
      </button>
    </form>
  );
}

function FieldError({ children }: { children: React.ReactNode }) {
  return (
    <p role="alert" className="mt-1.5 text-sm text-red-700">
      {children}
    </p>
  );
}
