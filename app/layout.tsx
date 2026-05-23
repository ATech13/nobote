import type { Metadata } from "next";
import "./globals.css";
import SessionWrapper from "@/lib/SessionWrapper"


export const metadata: Metadata = {
  title: "Noboté",
  description: "Venez nous montrer votre non-beauté",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionWrapper>
      <html lang="fr" data-theme="light">
        <body
        >
          {children}
        </body>
      </html>
    </SessionWrapper>
  );
}
