import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import { ClerkProvider, Show, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import { Toaster } from "sonner"



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
    <html lang="fr" data-theme="light">
      <body
        className=""
      >
        <ClerkProvider>
          <Navbar />
          {children}
          <Toaster
            position="top-right"
            richColors
            closeButton
          />
        </ClerkProvider>
      </body>
    </html>
  );
}
