"use client";

import { UserContext } from "@/contexts/userContext";
import Link from "next/link";
import { useContext } from "react";

export const Header = () => {
  const { user } = useContext(UserContext);

  if (!user) {
    return null;
  }

  return (
    <header className="fixed top-0 left-0 right-0 flex justify-between p-4 border-b bg-background">
      <Link href={"/"}>Instagram</Link>
      <Link href={"/create"}>+</Link>
    </header>
  );
};
