import { type ReactNode } from "react";

export function Container({ children }: { children: ReactNode }) {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 flex flex-col items-center">
      {children}
    </div>
  );
}
