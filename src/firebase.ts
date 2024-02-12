import {initializeApp} from "firebase/app";
import {getDatabase} from "firebase/database";
import dotenv from "dotenv"
import dotenvExpand from 'dotenv-expand'

// @ts-ignore
dotenvExpand(dotenv.config());

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.VITE_API_KEY,
    authDomain: process.env.VITE_AUTH_DOMAIN,
    projectId: process.env.VITE_PROJECT_ID,
    storageBucket: process.env.VITE_STORAGE_BUCKET,
    messagingSenderId: process.env.VITE_SENDER_ID,
    appId: process.env.VITE_APP_ID,
    databaseUrl: process.env.VITE_DB_URL
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

getDatabase(app);
