"use server";

import { redirect } from "next/navigation";
import { login } from "@/lib/mijnnkgc/client";
import { MijnNkgcAuthError, MijnNkgcNotConfiguredError } from "@/lib/mijnnkgc/types";

export interface LoginActionState {
  error: "invalid_credentials" | "not_configured" | null;
}

export async function loginAction(
  _prevState: LoginActionState,
  formData: FormData
): Promise<LoginActionState> {
  const username = String(formData.get("username") ?? "");
  const password = String(formData.get("password") ?? "");

  try {
    await login({ username, password });
  } catch (error) {
    if (error instanceof MijnNkgcAuthError) {
      return { error: "invalid_credentials" };
    }
    if (error instanceof MijnNkgcNotConfiguredError) {
      return { error: "not_configured" };
    }
    throw error;
  }

  redirect("/mijnnkgc/dashboard");
}
