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
            duration={2500}
            visibleToasts={2}
            toastOptions={{
              classNames: {
                toast:
                  "!backdrop-blur-lg border shadow-lg rounded-full",

                title:
                  "text-base-content font-semibold",

                description:
                  "text-base-content/60 text-sm",

                success:
                  "!bg-success/20 text-base-content !border-success/40",

                error:
                  "!bg-error/20 text-base-content !border-error/40",

                warning:
                  "!bg-warning/20 text-base-content !border-warning/40",

                actionButton:
                  "!bg-secondary text-secondary-content",

                cancelButton:
                  "!bg-base-300 text-base-content",

                closeButton:
                  "!bg-base-300 text-base-content",
              },
            }}
          />
        </ClerkProvider>
      </body>
    </html>
  );
}
