import { SignIn } from "@clerk/react";

function SignInPage() {
  return (
    <div className="admin" style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
      <SignIn routing="path" path="/admin/sign-in" fallbackRedirectUrl="/admin" />
    </div>
  );
}

export default SignInPage;
