import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "~lib/auth";

import LoginForm from "./login-form";

async function SignIn() {
  const session = await getServerSession(authOptions);

  if (session?.user) redirect("/");

  return <LoginForm />;
}

export default SignIn;
