import { Metadata } from "next";

import LoginForm from "./login-form";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your account and start using Re-Me",
};

function Page() {
  return <LoginForm />;
}

export default Page;
