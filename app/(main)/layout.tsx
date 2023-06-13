import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "~lib/auth";

const navItems = [
  {
    name: "Library",
    href: "/",
  },
  {
    name: "Archive",
    href: "/archive",
  },
  // {
  //   name: "Trash",
  //   href: "/trash",
  // },
  {
    name: "Account",
    href: "/account",
  },
];

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/signin");

  return (
    <section className="relative grid min-h-screen grid-cols-12 gap-6 bg-[#130F40] px-6 py-8 text-[#FEF8FD]">
      <div className="sticky col-span-2 h-fit items-start space-y-5 rounded-3xl bg-[#1E1633] px-3 py-4">
        <div>
          <h1 className="font-mono text-2xl font-bold text-[#FFEC78] lg:text-3xl">
            Re-Me
          </h1>
          <p className="text-sm text-[#93A3B6]">a bookmarking reminder app</p>
        </div>

        <ul className="text-[#FEF8FD]">
          {navItems.map((item) => (
            <li
              key={item.name}
              className="w-fit cursor-pointer text-lg hover:underline"
            >
              <Link href={item.href}>{item.name}</Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="col-span-10 rounded-3xl bg-[#1E1633] py-10">
        {children}
      </div>
    </section>
  );
}
