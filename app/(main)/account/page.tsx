import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "~lib/auth";

import Account from "./account";

export const metadata: Metadata = {
  title: "Account",
  description: "Manage your account settings",
};

async function Page() {
  const session = await getServerSession(authOptions);

  if (!session) return;

  return <Account session={session} />;
}

export default Page;
