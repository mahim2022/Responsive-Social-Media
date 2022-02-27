import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import { getAuth } from "firebase/auth";
import { db } from "../../firebase/firebase_init";
import { addDoc, collection } from "firebase/firestore";

export const InputBootStrap = () => {
	const [text, setText] = useState();

	//////////onSubmitFunction/////////
	const onSubmit = async (e) => {
		////////Preventing refresh///////
		e.preventDefault();
		//////Getting UserInfo///////
		const auth = getAuth();
		const user = auth.currentUser;
		if (user !== null) {
			/////////Uploading Posts///////////
			try {
				const docRef = await addDoc(collection(db, "Posts"), {
					post: text,
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
		// setCounter(!counter);
	};
	return (
		<Form>
			<Form.Group className="mb-3" controlId="formBasicEmail">
				<Form.Label>Make A Post</Form.Label>
				<Form.Control
					type="email"
					placeholder="Enter email"
					onSubmit={(e) => {
						e.preventDefault();
						onSubmit();
					}}
					onChange={(e) => setText(e.target.value)}
					value={text || ""}
				/>
				<Form.Text className="text-muted">
					We'll never share your email with anyone else.
				</Form.Text>
			</Form.Group>
			<Button variant="primary" type="submit">
				Submit
			</Button>
		</Form>
	);
};
