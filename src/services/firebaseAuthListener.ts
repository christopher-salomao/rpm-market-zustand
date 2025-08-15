import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseConnection";
import { useAuthStore } from "@/store/authStore";


export function initAuthListener() {
  const { handleInfoUser } = useAuthStore.getState();
  
  useAuthStore.setState({ loadingAuth: true });

  onAuthStateChanged(auth, (firebaseUser) => {
    if (firebaseUser) {
      handleInfoUser({
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        name: firebaseUser.displayName,
      });
    } else {
      useAuthStore.setState({ user: null, signed: false });
    }
    useAuthStore.setState({ loadingAuth: false });
  });
}
