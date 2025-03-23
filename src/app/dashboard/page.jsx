"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import supabase from "@/lib/supabaseClient";

export default function Page() {
  const [session, setSession] = useState(null);

  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const userSession = await supabase.auth.getSession();

      setSession(userSession.data.session);

      if (!userSession.data.session) {
        router.push("/sign-in");
      }
    };

    checkSession();
  }, [router]);

  if (!session) {
    return (
      <div className="flex justify-center items-center">
        <h1 className="text-3xl">Loading...</h1>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <h1>Dashboard</h1>
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <div className="aspect-video rounded-xl bg-muted/50 p-4">
            <div className="flex justify-between items-center gap-4">
              <h2 className="text-2xl font-semibold">Total Articles</h2>
              <img
                src=""
                alt="icon"
                className="w-10 aspect-square bg-muted rounded-2xl"
              />
            </div>
          </div>
          <div className="aspect-video rounded-xl bg-muted/50 p-4">
            <h2>Total Articles</h2>
          </div>
          <div className="aspect-video rounded-xl bg-muted/50 p-4">
            <h2>Total Articles</h2>
          </div>
        </div>
        <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
      </div>
    </>
  );
}
