import { type ReactNode } from "react";

import { useAuthStore } from "@/store/authStore";
import { Navigate } from "react-router-dom";


export function Guest({ children }: { children: ReactNode }) {
  const { signed, loadingAuth } = useAuthStore();

  if (loadingAuth) {
    return <div></div>;
  }

  if (signed) {
    return <Navigate to="/dashboard" />;
  }

  return children;
}
