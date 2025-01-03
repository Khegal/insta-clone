"use client";

import axios from "axios";
import { createContext, useState, useEffect } from "react";

type User = {
  _id: string;
  profileUrl: string;
  username: string;
};

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
        .get("http://localhost:3333/api/auth/me", {
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
