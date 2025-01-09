"use client";

import Signup from "@/components/SignUp";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { UserContext } from "@/contexts/userContext";

const SignInPage = () => {
  const { user } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  return (
    <div className="flex justify-center items-center h-screen flex-grow">
      <div className="mt-8 mx-auto pb-8 max-w-md">
        <div className="mt-3">
          <Signup />
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
