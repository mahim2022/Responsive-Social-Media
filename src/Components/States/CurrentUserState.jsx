import React, { useEffect } from "react";
import { createContext, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const CurrentUserState = createContext();

export const CurrentUserStateProvider = (props) => {
	const [currentUser, setCurrentUser] = useState(null);
	const auth = getAuth();

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				// User is signed in, see docs for a list of available properties
				// https://firebase.google.com/docs/reference/js/firebase.User

				// ...
				setCurrentUser(user);
			} else {
				// User is signed out
				// ...
			}
		});
	}, [auth]);

	return (
		<CurrentUserState.Provider value={[currentUser, setCurrentUser]}>
			{props.children}
		</CurrentUserState.Provider>
	);
};
