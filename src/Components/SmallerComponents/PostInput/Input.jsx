import "./input.scss";
import { useState } from "react";
import { getAuth } from "firebase/auth";
import { db } from "../../firebase/firebase_init";
import { addDoc, collection } from "firebase/firestore";

export const Input = () => {
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
		////////https://codepen.io/meodai/pen/rNedxBa/////////
		<div className="card card--inverted">
			<h2>
				{/* <svg className="icon" aria-hidden="true">
					<use xlink:href="#icon-coffee" href="#icon-coffee" />
				</svg> */}
				Make A Post
			</h2>
			<label className="input">
				<input
					className="input__field"
					type="text"
					onSubmit={(e) => {
						e.preventDefault();
						onSubmit();
					}}
					onChange={(e) => setText(e.target.value)}
					value={text || ""}
				/>
				<span className="input__label">Write post</span>
			</label>

			<div className="button-group">
				<button onClick={onSubmit}>Send</button>
				<button type="reset">Reset</button>
			</div>
		</div>
	);
};
