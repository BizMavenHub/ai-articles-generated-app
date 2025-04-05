"use client";

import { useState } from "react";

import { Input } from "@/components/ui/input";

import { HistoryContext } from "@/context/historyContext";
import HistoryTable from "@/components/history_component/history_table";

export default function HistorySearchInput() {
  const [searchInput, setSearchInput] = useState("");

  return (
    <HistoryContext.Provider value={searchInput} className="space-y-5">
      <Input
        placeholder="Search by Id, Title, Content, or Date"
        className="w-full"
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <HistoryTable />
    </HistoryContext.Provider>
  );
}
