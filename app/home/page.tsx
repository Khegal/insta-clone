"use client";
import { redirect } from "next/navigation";
import { useContext } from "react";
import { UserContext } from "@/contexts/userContext";

const Home = () => {
  const { isSignedIn, setIsSignedIn } = useContext(UserContext);

  if (!isSignedIn) {
    return redirect("/");
  }
  return (
    <>
      INSTAGRAM APP
      <button
        onClick={() => {
          setIsSignedIn(false);
          localStorage.setItem("isSignedIn", "false");
        }}
      >
        signout
      </button>
    </>
  );
};

export default Home;
