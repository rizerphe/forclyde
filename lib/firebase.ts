import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDso1j-MiVlhx9ntXZqnZjc5600_fDhus8",
  authDomain: "forclyde-ec517.firebaseapp.com",
  projectId: "forclyde-ec517",
  storageBucket: "forclyde-ec517.appspot.com",
  messagingSenderId: "132319892360",
  appId: "1:132319892360:web:48802192083766bd44e03d",
  measurementId: "G-59Y3MSE57D",
  databaseURL: "https://forclyde-ec517-default-rtdb.firebaseio.com/",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics =
  app.name && typeof window !== "undefined" ? getAnalytics(app) : null;
const database = getDatabase(app);

export { app, auth, analytics, database };
