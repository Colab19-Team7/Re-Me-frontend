import { getServerSession } from "next-auth";
import {
  LoginButton,
  LogoutButton,
  ProfileButton,
  RegisterButton,
} from "~components/button";
import { authOptions } from "~lib/auth";

export default async function AuthPage() {
  const session = await getServerSession(authOptions);

  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "70vh",
      }}
    >
      <div>
        <LoginButton />
        <RegisterButton />
        <LogoutButton />
        <ProfileButton />
      </div>
      <div>
        <h1>Server Session</h1>
        <pre>{JSON.stringify(session?.user)}</pre>
      </div>
    </main>
  );
}
