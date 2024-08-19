"use server";

import { cookies } from "next/headers";
import { ActionResult } from "../(auth)/signin/action";
import { getUser, lucia } from "../../../lib/auth";
import { redirect } from "next/navigation";
export async function logout(): Promise<ActionResult> {
  const { session } = await getUser();
  if (!session) {
    return { errorTitle: "Session not found", errorDesc: ["unauthorized"] };
  }
  await lucia.invalidateSession(session.id);
  const sessionCookie = lucia.createBlankSessionCookie();

  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  return redirect("/dashboard/signin");
}
