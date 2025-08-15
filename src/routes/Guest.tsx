import { type ReactNode, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext/context";
import { Navigate } from "react-router-dom";


export function Guest({ children }: { children: ReactNode }) {
  const { signed, loadingAuth } = useContext(AuthContext);

  if (loadingAuth) {
    return <div></div>;
  }

  if (signed) {
    return <Navigate to="/dashboard" />;
  }

  return children;
}
