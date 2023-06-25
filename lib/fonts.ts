import { Roboto as FontSans } from "next/font/google";
import localFont from "next/font/local";

export const fontSans = FontSans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-sans",
});

export const fontMono = localFont({
  variable: "--font-mono",
  src: [
    {
      path: "../public/fonts/Bauhaus-93-Regular.ttf",
      weight: "400",
    },
  ],
});
