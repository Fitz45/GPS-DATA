// eseal-mobile/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  databaseURL: "https://eseals-44c47-default-rtdb.firebaseio.com/"
  // Add other config fields if needed (apiKey, authDomain, etc.)
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

export { app, database, auth };
