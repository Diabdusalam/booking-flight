"use server";

import { redirect } from "next/navigation";
import { formSchema } from "./validation";
import { prisma } from "../../../../../lib/prisma";
import bcrypt from "bcrypt";
import { lucia } from "@/lib/auth";
import { cookies } from "next/headers";

export interface ActionResult {
  errorTitle: string | null;
  errorDesc: string[] | null;
}

export async function handleSignIn(
  prevState: any,
  formData: FormData
): Promise<ActionResult> {
  console.log(formData.get("email"));
  const value = formSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!value.success) {
    return {
      errorTitle: "Validation error",
      errorDesc: value.error.errors.map((err) => err.message),
    };
  }
  //services api

  const existingUser = await prisma.user.findFirst({
    where: {
      email: value.data.email,
    },
  });
  if (!existingUser) {
    return { errorTitle: "User not found", errorDesc: null };
  }
  const validationPassword = bcrypt.compare(
    value.data.password,
    existingUser.password
  );
  if (!validationPassword) {
    return {
      errorTitle: "Password not match",
      errorDesc: ["Password / Email does not match"],
    };
  }

  const session = await lucia.createSession(existingUser.id, {});

  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );

  return redirect("/dashboard");
}
