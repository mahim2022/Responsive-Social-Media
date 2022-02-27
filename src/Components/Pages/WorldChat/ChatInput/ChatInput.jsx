import { useContext, useState } from "react";
import "./ChatInput.css";
import { getAuth } from "firebase/auth";
import { db } from "../../../firebase/firebase_init";
import { addDoc, collection } from "firebase/firestore";

export const ChatInput = () => {
	const [text, setText] = useState("");

	const onSubmit = async (e) => {
		////////Preventing refresh///////
		e.preventDefault();
		//////Getting UserInfo///////
		const auth = getAuth();
		const user = auth.currentUser;
		if (user !== null) {
			/////////Uploading Posts///////////
			try {
				const docRef = await addDoc(collection(db, "WorldChat"), {
					message: text,
					displayName: user.displayName,
					email: user.email,
					photoURL: user.photoURL,
					uid: user.uid,
					createdAt: new Date(),
				});
				console.log("Document written with ID: ", docRef.id);
			} catch (e) {
				console.error("Error adding document: ", e);
			}
		}

		////////////ClearingInputField///////////
		setText("");
	};

	return (
		<div className="inputfield">
			<input
				style={{ border: "none", width: "100%" }}
				type="text"
				onSubmit={(e) => {
					e.preventDefault();
					onSubmit();
				}}
				onChange={(e) => setText(e.target.value)}
				value={text || ""}
			></input>
			<button onClick={onSubmit}>send</button>
		</div>
	);
};
