import { createContext } from "react";

import type { UserProps } from "./provider";

interface AuthContextData {
  signed: boolean;
  loadingAuth: boolean;
  user: UserProps | null;
  handleInfoUser: ({ uid, email, name }: UserProps) => void;
}

export const AuthContext = createContext({} as AuthContextData);
