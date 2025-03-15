import React from "react";

export const metadata = {
    title: "Dashboard",
    description: "Generate high-quality content with AI",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                {children}
            </body>
        </html>
    );
}
