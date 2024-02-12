import {initializeApp} from "firebase/app";
import {getDatabase} from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.SENDER_ID,
    appId: process.env.APP_ID,
    databaseUrl: process.env.DB_URL
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

getDatabase(app);
