import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { provider } from "../../firebase/firebase_init";
import { doc, setDoc } from "firebase/firestore";
import { collection, getDocs, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase_init";
import React from "react";

export default function SignInPage() {
	const SignIn = async () => {
		const auth = getAuth();
		signInWithPopup(auth, provider)
			.then(async (result) => {
				// This gives you a Google Access Token. You can use it to access the Google API.
				const credential = GoogleAuthProvider.credentialFromResult(result);
				const token = credential.accessToken;
				// The signed-in user info.
				const user = result.user;
				// ...

				////////////Checking for existing user before Assigning docs/////////
				{
					const docRef = doc(db, "Users", user.email);
					const docSnap = await getDoc(docRef);
					if (docSnap.exists()) {
						// console.log(`User Exists`);
					} else {
						// doc.data() will be undefined in this case
						// Uploading NewUserInfo to Users Collections
						await setDoc(doc(db, "Users", user.email), {
							name: user.displayName,
							email: user.email,
							photoURL: user.photoURL,
							followers: [],
							following: [],
						});
						// console.log("Brand New User");
					}
				}
			})
			.catch((error) => {
				// Handle Errors here.
				const errorCode = error.code;
				const errorMessage = error.message;
				// The email of the user's account used.
				const email = error.email;
				// The AuthCredential type that was used.
				const credential = GoogleAuthProvider.credentialFromError(error);
				// ...
			});
	};

	return (
		<div style={{ textAlign: "center", position: "relative", top: "45vh" }}>
			<button
				onClick={() => {
					SignIn();
				}}
			>
				Sign-In
			</button>
		</div>
	);
}
