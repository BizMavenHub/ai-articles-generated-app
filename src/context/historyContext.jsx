"use client";

import { createContext, useContext } from "react";

export const HistoryContext = createContext(undefined);

export const useHistoryContext = () => {
  const input = useContext(HistoryContext);

  return input;
};
