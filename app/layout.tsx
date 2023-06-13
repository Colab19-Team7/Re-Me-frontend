"use client";

import { useEffect } from "react";
import { TailwindIndicator } from "~components/tailwind-indicator";
import { fontMono, fontSans } from "~lib/fonts";
import { regSW } from "~lib/regSw";
import { cn } from "~lib/utils";

import "~styles/globals.css";
import { Providers } from "../components/providers";

// const metadata: Metadata = {
//   title: siteConfig.name,
//   description: siteConfig.description,
//   themeColor: [
//     { media: "(prefers-color-scheme: light)", color: "white" },
//     { media: "(prefers-color-scheme: dark)", color: "black" },
//   ],
//   icons: {
//     icon: "/favicon.ico",
//   },
//   openGraph: {
//     title: siteConfig.name,
//     locale: "en_US",
//     url: siteConfig.url,
//     siteName: siteConfig.name,
//     images: [
//       {
//         url: `https://re-me.onrender.com/main-logo.png`,
//         width: 1200,
//         height: 630,
//         alt: siteConfig.name,
//       },
//     ],
//   },
// };
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
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable,
            fontMono.variable
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
