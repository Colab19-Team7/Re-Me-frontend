import Link from "next/link";
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
            "min-h-screen bg-[#130F40] font-sans antialiased"
          )}
        >
          <Toaster />
          <Providers>
            <div className="relative flex min-h-screen flex-col">
              <div className="flex-1">{children}</div>

              <footer className="flex-none">
                <div className="container mx-auto p-4">
                  <div className="flex flex-col items-center gap-2.5 text-white md:flex-row">
                    <div className="text-sm">
                      Copyright &copy; {new Date().getFullYear()}{" "}
                      <span className="font-bold">Re-Me</span>
                    </div>
                    <div className="text-sm">
                      <Link href="/privacy" className="underline">
                        Privacy Policy
                      </Link>
                    </div>
                  </div>
                </div>
              </footer>
            </div>
            <TailwindIndicator />
          </Providers>
        </body>
      </html>
    </>
  );
}
