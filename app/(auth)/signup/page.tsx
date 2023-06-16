import { Metadata } from "next";

import RegisterForm from "./register-form";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create a new account",
};

function Page() {
  return <RegisterForm />;
}

export default Page;
