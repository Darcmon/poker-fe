import { createContext, useContext, useEffect, useState } from "react";

import Login from "./Login";
import React from "react";
import { useSessionStorage } from "react-use";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function useAccessToken() {
  return useAuth()["access_token"];
}

export function useUser() {
  const auth = useAuth();
  const [user, setUser] = useState();

  useEffect(async () => {
    const response = await fetch("/api/me", {
      headers: {
        Authorization: "Bearer " + auth.access_token,
      },
    });
    setUser(await response.json());
  }, [auth]);

  return user;
}

export function AuthContextProvider({ children }) {
  const [sessionAuth, setSessionAuth] = useSessionStorage("auth");
  const [auth, setAuth] = useState(sessionAuth);

  const saveAuth = (auth) => {
    setSessionAuth(auth);
    setAuth(auth);
  };

  if (!auth) {
    return <Login setAuth={saveAuth} />;
  }

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}
