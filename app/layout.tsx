import type { Metadata } from "next";
import "./globals.css";
import SessionWrapper from "@/lib/SessionWrapper"
import { EdgeStoreProvider } from "@/lib/edgestore";


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
          <EdgeStoreProvider>{children}</EdgeStoreProvider>
        </body>
      </html>
    </SessionWrapper>
  );
}
