import { Metadata } from "next";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { Icons } from "~components/icons";
import { siteConfig } from "~config/site";
import { authOptions } from "~lib/auth";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    type: "website",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: `${siteConfig.url}/main-logo.png`,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (session?.user) redirect("/");

  return (
    <div className="grid min-h-screen grid-cols-12 bg-gradient-to-b from-[#0D0B25] from-20% via-[#261C92] via-100% to-[#93A3B6] to-100%">
      <div className="col-span-3 flex flex-col items-center justify-center gap-4 bg-[url('/auth-bg.png')] bg-cover text-[#FFE169]">
        <h1 className="text-5xl font-semibold uppercase">Welcome to</h1>
        <Icons.logo className="h-64 w-52" />
        <div className="self-stretch bg-[#13143B] py-6">
          <h1 className="text-center font-mono text-8xl">Re-Me</h1>
        </div>
      </div>
      <div className="col-span-9 grid place-content-center">{children}</div>
    </div>
  );
}
