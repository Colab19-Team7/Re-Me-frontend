import { Metadata } from "next";
import { TailwindIndicator } from "~components/tailwind-indicator";
import { siteConfig } from "~config/site";
import { fontMono, fontSans } from "~lib/fonts";
import { cn } from "~lib/utils";

import "~styles/globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
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
