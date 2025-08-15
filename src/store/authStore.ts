import { auth } from "@/services/firebaseConnection";
import { onAuthStateChanged } from "firebase/auth";
import { create } from "zustand";

interface UserProps {
  uid: string;
  email: string | null;
  name: string | null;
}

interface AuthState {
  signed: boolean;
  loadingAuth: boolean;
  user: UserProps | null;
  handleInfoUser: ({ uid, email, name }: UserProps) => void;
  initAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  signed: false,
  loadingAuth: true,
  user: null,
  handleInfoUser: ({ uid, email, name }) =>
    set({
      user: { uid, email, name },
      signed: true,
    }),
  initAuth: () => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        set({
          user: {
            uid: user.uid,
            email: user?.email,
            name: user?.displayName,
          },
          signed: true,
          loadingAuth: false,
        });
      } else {
        set({
          user: null,
          signed: false,
          loadingAuth: false,
        });
      }
    });

    return unsub;
  },
}));
