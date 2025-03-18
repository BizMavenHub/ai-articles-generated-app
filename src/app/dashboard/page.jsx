"use client";

import { useAuthContext } from "@/context/authenticationContext";
import { useRouter } from "next/navigation";

export default function Page() {
  const { session } = useAuthContext();

  const router = useRouter();

  if (!session) {
    router.push("/sign-in");
  }

  return (
    <>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <h1>Dashboard</h1>
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <div className="aspect-video rounded-xl bg-muted/50" />
          <div className="aspect-video rounded-xl bg-muted/50" />
          <div className="aspect-video rounded-xl bg-muted/50" />
        </div>
        <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
      </div>
    </>
  );
}
