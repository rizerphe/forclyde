import { getAuth, signInWithCustomToken } from "firebase/auth";
import { app } from "./firebase";

const auth = getAuth(app);
const firebaseSignIn = (token: string) => signInWithCustomToken(auth, token);
const firebaseSignOut = () => auth.signOut();

export { auth, firebaseSignIn, firebaseSignOut };
