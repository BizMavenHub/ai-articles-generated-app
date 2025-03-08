import React from "react";
import "./globals.css";

import { AuthContextProvider } from "@/context/authenticationContext";

export const metadata = {
  title: "AI Content Generator",
  description: "Generate high-quality content with AI",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthContextProvider>{children}</AuthContextProvider>
      </body>
    </html>
  );
}
