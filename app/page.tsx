"use client";

import SignIn from "@/components/SignIn";
import { redirect } from "next/navigation";
import { useContext } from "react";
import { UserContext } from "@/contexts/userContext";

const SignInPage = () => {
  const { isSignedIn, setIsSignedIn } = useContext(UserContext);

  if (isSignedIn) {
    return redirect("/home");
  }
  return (
    <div className=" flex justify-center items-center h-screen flex-grow">
      <div className="mt-8 mx-auto pb-8 max-w-md">
        <div className="mt-3">
          <SignIn></SignIn>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
