import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { Icons } from "~components/icons";
import { siteConfig } from "~config/site";
import { authOptions } from "~lib/auth";
import { cn } from "~lib/utils";

const navItems = [
  {
    name: "Library",
    href: "/",
    icon: Icons.library,
  },
  {
    name: "Archive",
    href: "/archive",
    icon: Icons.archive,
  },
  // {
  //   name: "Trash",
  //   href: "/trash",
  // },
  {
    name: "Account",
    href: "/account",
    icon: Icons.account,
  },
];

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

  if (!session) redirect("/signin");

  return (
    <section className="relative grid min-h-screen grid-cols-12 gap-6 bg-[#130F40] px-6 py-8 text-[#FEF8FD]">
      <div className="sticky col-span-3 h-fit w-[277px] items-start space-y-5 rounded-2xl bg-[#1E1633] py-4">
        <div className="px-6">
          <h1 className="font-mono text-2xl font-bold text-[#FFEC78] lg:text-3xl">
            Re-Me
          </h1>
          <p className="text-sm text-[#93A3B6]">a bookmarking reminder app</p>
        </div>

        <ul className="flex flex-col gap-4 text-[#FEF8FD]">
          {navItems.map((item) => (
            <li
              key={item.name}
              className={cn(
                "flex h-[40px] cursor-pointer items-center px-6",
                "hover:bg-[#6D7885] active:bg-[#434A52]",
                "transition-colors duration-300 ease-in"
              )}
            >
              <Link
                className="flex w-full items-center gap-5 text-lg"
                href={item.href}
              >
                <item.icon className="mr-2 inline-block h-5 w-5" />
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="col-span-9 rounded-3xl bg-[#1E1633] py-10">
        {children}
      </div>
    </section>
  );
}
