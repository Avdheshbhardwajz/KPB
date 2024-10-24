import type { Metadata } from "next";
import "./globals.css";
import AuthProvider from "@/Auth-Context/AuthProvider";
import { Analytics } from "@vercel/analytics/react"

export const metadata: Metadata = {
  title: "Krishna Poshak Bhandar",
  description: "Comeing Soon",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthProvider>
        <body
          className={`antialiased`}
        >
          {children}
          <Analytics />
        </body>
      </AuthProvider>
    </html>
  );
}
