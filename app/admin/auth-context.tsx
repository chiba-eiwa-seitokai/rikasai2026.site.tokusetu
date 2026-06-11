"use client";

import { createContext, useContext } from "react";

type AuthCtx = { token: string; logout: () => void };
export const AuthContext = createContext<AuthCtx>({ token: "", logout: () => {} });
export function useAuth() { return useContext(AuthContext); }
