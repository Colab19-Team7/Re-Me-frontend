import { TailwindIndicator } from "~components/tailwind-indicator";
import { Toaster } from "~components/ui/toaster";
import { fontMono, fontSans } from "~lib/fonts";
import { cn } from "~lib/utils";

import "~styles/globals.css";
import { Providers } from "../components/providers";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  // useEffect(() => {
  //   regSW();
  // }, []);

  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={cn(
            fontMono.variable,
            fontSans.variable,
            "min-h-screen bg-background font-sans antialiased"
          )}
        >
          <Toaster />
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
