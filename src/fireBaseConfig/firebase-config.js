import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyALgBIIgfFsH5cHWmw5ezqg1xyI7q_EJhc",
    authDomain: "withbloom-9b3ad.firebaseapp.com",
    projectId: "withbloom-9b3ad",
    storageBucket: "withbloom-9b3ad.appspot.com",
    messagingSenderId: "936410697987",
    appId: "1:936410697987:web:564d0612dd45806f17d936",
    measurementId: "G-6MB02PFR2B"
  };
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);