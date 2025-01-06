"use client";

import { User } from "@/app/types/types";
import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const UserContext = createContext<{
  user: User | null;
  accessToken: string;
  setAccessToken: (_value: string) => void;
}>({ user: null, accessToken: "", setAccessToken: () => {} });

export const UserContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    setAccessToken(localStorage.getItem("accessToken") || "");
  }, []);

  useEffect(() => {
    localStorage.setItem("accessToken", accessToken);
    if (accessToken !== "") {
      axios
        .get(`${process.env.NEXT_PUBLIC_API}/api/auth/me`, {
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        })
        .then((res) => {
          setUser(res.data);
        })
        .catch(() => {
          setUser(null);
        });
    } else {
      setUser(null);
    }
  }, [accessToken]);

  return (
    <UserContext.Provider
      value={{
        user,
        accessToken,
        setAccessToken,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
