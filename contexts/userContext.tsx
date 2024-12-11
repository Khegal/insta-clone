"use client";

import { createContext, useState, useEffect } from "react";

export const UserContext = createContext<{
  isSignedIn: boolean;
  setIsSignedIn: (val: boolean) => void;
}>({
  isSignedIn: false,
  setIsSignedIn: (value: boolean) => {
    console.log(value);
  },
});

export const UserContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const isSignedInStorage = localStorage.getItem("isSignedIn");
    setIsSignedIn(isSignedInStorage === "true");
  }, []);
  return (
    <UserContext.Provider
      value={{
        isSignedIn,
        setIsSignedIn,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
