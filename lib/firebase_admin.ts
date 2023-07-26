import admin from "firebase-admin";

const serviceAccount = {
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key: JSON.parse(process.env.FIREBASE_PRIVATE_KEY || ""),
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
};

const app = admin.apps.length
  ? admin.app()
  : admin.initializeApp({
      credential: admin.credential.cert(serviceAccount as any),
      databaseURL: "https://forclyde-ec517-default-rtdb.firebaseio.com",
    });

export default app;

const database = admin.database(app);
export { database };
