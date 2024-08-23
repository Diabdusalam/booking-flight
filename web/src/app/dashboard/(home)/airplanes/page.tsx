import { Button } from "@/components/ui/button";
import React from "react";

export default function AirplanePage() {
  return (
    <>
      <div className="flex flex-row items-center justify-between">
        <div className="my-5 text-2xl font-bold ">Airplanes</div>
        <Button asChild>
          <Link href="/dashboard/create"></Link>
        </Button>
      </div>
    </>
  );
}
