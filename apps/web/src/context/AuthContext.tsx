import React, { createContext, useContext, useEffect, useState } from "react";
import { api, setAccessToken } from "../api/client";
import { UserRole } from "@aggregator-optima/shared";

export type AuthUser = { id: number; email: string; role: UserRole; createdAt?: string };

type AuthContextValue = {
  user: AuthUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

async function fetchUser() {
  const resp = await api.get("/api/v1/auth/me");
  return resp.data.user as AuthUser;
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        let token = localStorage.getItem("accessToken");
        if (!token) {
          try {
            const resp = await api.post("/api/v1/auth/refresh");
            token = resp.data.accessToken;
            setAccessToken(token);
          } catch {
            setAccessToken(null);
          }
        }
        if (token) {
          const u = await fetchUser();
          setUser(u);
        }
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  const login = async (email: string, password: string) => {
    const resp = await api.post("/api/v1/auth/login", { email, password });
    setAccessToken(resp.data.accessToken);
    setUser(resp.data.user);
  };

  const register = async (email: string, password: string) => {
    await api.post("/api/v1/auth/register", { email, password });
    // Auto-login newly registered user
    await login(email, password);
  };

  const logout = async () => {
    await api.post("/api/v1/auth/logout");
    setAccessToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
