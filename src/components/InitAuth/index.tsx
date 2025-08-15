import { router } from "@/routes";
import { useAuthStore } from "@/store/authStore";
import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";

 export function InitAuth() {
  const { initAuth } = useAuthStore();

  useEffect(() => {
    const unsub = initAuth();
    return unsub;
  });

  return <RouterProvider router={router} />;
}
