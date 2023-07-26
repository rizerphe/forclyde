import { getAuth } from "firebase-admin/auth";
import app from "./firebase_admin";

const auth = getAuth(app);

export async function login(uid: string): Promise<string> {
  return await auth.createCustomToken(uid);
}

export async function verify(token: string): Promise<string> {
  const decodedToken = await auth.verifyIdToken(token);
  return decodedToken.uid;
}
