"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import supabase from "@/lib/supabaseClient";

// Icons
import { Edit, Trash2 } from "lucide-react";

// Components
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableHeader,
} from "@/components/ui/table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import HistorySearchInput from "@/components/history_component/history_search_input";

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
        <h1 className="text-4xl font-semibold my-4">Dashboard</h1>
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          {/* Total Articles */}
          <section className="h-[20vh] rounded-xl bg-muted/50 p-8 flex flex-col space-y-2">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium">Total Articles</h2>
            </div>
            <span className="text-5xl font-bold">5</span>
            <p className="text-sm text-gray-600">+1 from last month</p>
          </section>

          {/* Total Articles This Month */}
          <section className="h-[20vh] rounded-xl bg-muted/50 p-8 flex flex-col space-y-2">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium">Articles This Month</h2>
            </div>
            <span className="text-5xl font-bold">5</span>
            <p className="text-sm text-gray-600">+1 from last month</p>
          </section>

          {/* Total Word Count */}
          <section className="h-[20vh] rounded-xl bg-muted/50 p-8 flex flex-col space-y-2">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium">Total Words Count</h2>
            </div>
            <span className="text-5xl font-bold">5</span>
            <p className="text-sm text-gray-600">+1 from last month</p>
          </section>
        </div>

        <div className="grid auto-rows-min gap-4 md:grid-cols-2">
          <section className="h-[60vh] flex flex-col space-y-6 rounded-xl bg-muted/50 p-6">
            <div className="flex justify-between">
              <h2 className="text-2xl font-semibold">Articles</h2>
              <Button>New Article</Button>
            </div>

            <div>
              <HistorySearchInput />
            </div>
          </section>

          <section className="h-[60vh] flex flex-col space-y-6 rounded-xl bg-muted/50 p-6">
            <div className="flex justify-between">
              <h2 className="text-2xl font-semibold">Trending Keywords</h2>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
