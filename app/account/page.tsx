import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "~lib/auth";

import Account from "./account";

async function Page() {
  const session = await getServerSession(authOptions);

  if (!session?.user) redirect("/signin");

  return <Account session={session} />;
}

export default Page;
