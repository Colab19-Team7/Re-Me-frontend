"use client";

import { useEffect } from "react";
import { TailwindIndicator } from "~components/tailwind-indicator";
import { fontMono, fontSans } from "~lib/fonts";
import { regSW } from "~lib/regSw";
import { cn } from "~lib/utils";

import "~styles/globals.css";
import { Providers } from "../components/providers";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  useEffect(() => {
    regSW();
  }, []);

  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={cn(
            fontMono.variable,
            fontSans.variable,
            "min-h-screen bg-background antialiased"
          )}
        >
          <Providers>
            <div className="relative flex min-h-screen flex-col">
              <div className="flex-1">{children}</div>
            </div>
            <TailwindIndicator />
          </Providers>
        </body>
      </html>
    </>
  );
}
