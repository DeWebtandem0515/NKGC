"use server";

import { redirect } from "next/navigation";
import { logout } from "@/lib/mijnnkgc/client";

export async function logoutAction() {
  await logout();
  redirect("/mijnnkgc/inloggen");
}
