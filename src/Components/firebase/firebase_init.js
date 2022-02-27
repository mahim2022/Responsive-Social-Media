// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyC9tvXmPbG_BkQSmOhRhugBZ5DjOha6fbE",
	authDomain: "twitter-99f3f.firebaseapp.com",
	projectId: "twitter-99f3f",
	storageBucket: "twitter-99f3f.appspot.com",
	messagingSenderId: "120291209361",
	appId: "1:120291209361:web:fe47c6407ef77e83a10f30",
	measurementId: "G-FDV1Y0WLYP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const provider = new GoogleAuthProvider();

// Initialize Cloud Firestore through Firebase

export const db = getFirestore();
