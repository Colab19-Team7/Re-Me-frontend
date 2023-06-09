import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "~lib/auth";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/signin");

  return <section>{children}</section>;
}
