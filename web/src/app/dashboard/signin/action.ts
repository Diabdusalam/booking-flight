"use server";

import { redirect } from "next/navigation";
import { formSchema } from "./validation";

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
  return redirect("/dashboard/sigin");
}
