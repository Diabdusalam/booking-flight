import { Metadata } from "next";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import React from "react";
import { ActionResult, handleSignIn } from "./action";
import { useFormState } from "react-dom";
export const metadata: Metadata = {
  title: "Dashboard | Sign In",
};
const initialFormState: ActionResult = {
  errorTitle: null,
  errorDesc: [],
};
export default function SignInpage() {
  const [state, formAction] = useFormState(handleSignIn, initialFormState);
  return (
    <div className="w-full h-screen">
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form action={formAction} className="space-y-6">
            <Input
              type="email"
              name="email"
              placeholder="Email"
              required
            ></Input>
            <Input
              type="password"
              name="password"
              placeholder="password"
              required
            ></Input>
            <Button type="submit" className="w-full">
              submit
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
