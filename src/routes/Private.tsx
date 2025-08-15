import { type ReactNode } from "react";
import { useAuthStore } from "@/store/authStore";
import { Navigate } from "react-router-dom";
import { Spinner } from "../components/Spinner";

export function Private({ children }: { children: ReactNode }) {
  const { signed, loadingAuth } = useAuthStore();

  if (loadingAuth) {
    return <Spinner />;
  }

  if (!signed) {
    return <Navigate to="/login" />;
  }

  return children;
}
