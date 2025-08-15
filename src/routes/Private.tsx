import { type ReactNode, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext/context";
import { Navigate } from "react-router-dom";
import { Spinner } from "../components/Spinner";


export function Private({ children }: { children: ReactNode }) {
  const { signed, loadingAuth } = useContext(AuthContext);

  if (loadingAuth) {
    return <Spinner />;
  }

  if (!signed) {
    return <Navigate to="/login" />;
  }

  return children;
}
