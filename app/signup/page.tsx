import { Metadata } from "next";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "~lib/auth";

import RegisterForm from "./register-form";

const metadata: Metadata = {
  title: "Sign Up",
  description: "Sign up for an account and start using Re-Me",
};

async function SignIn() {
  const session = await getServerSession(authOptions);

  if (session?.user) redirect("/");

  return <RegisterForm />;
}

export default SignIn;
