import { Card, Button } from "react-bootstrap";
import { doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useCallback, useContext, useEffect, useState } from "react";
import { db } from "../../firebase/firebase_init";
import { CurrentUserState } from "../../States/CurrentUserState";
import {
	collection,
	query,
	where,
	onSnapshot,
	orderBy,
	limit,
} from "firebase/firestore";
import { Input } from "../../SmallerComponents/PostInput/Input";
import { GetUserPosts } from "../../SmallerComponents/Posts/GetUserPosts";

export const ProfilePage = () => {
	const [post, setPost] = useState([]);
	//////////currentUser from auth//////////
	const [currentUser] = useContext(CurrentUserState);
	//////////user form collection docs//////////
	const [currentProfile, setCurrentProfile] = useState();

	useEffect(async () => {
		//////Getting profile data from dataBase//////////
		const docRef = doc(db, "Users", currentUser.email);
		const docSnap = await getDoc(docRef);
		if (docSnap.exists()) {
			// console.log("Document data:", docSnap.data());
			setCurrentProfile(docSnap.data());
			// console.log(currentProfile.followers.length);
		} else {
			// doc.data() will be undefined in this case
			console.log("No such document!");
		}
		//////////Getting realtimedata///////////
		const q = query(
			collection(db, "Posts"),
			where("email", "==", `${currentUser.email}`)
		);
		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			const posts = [];
			querySnapshot.forEach((doc) => {
				posts.push(doc.data());
			});
			setPost(posts);
		});
		return unsubscribe;
	}, []);
	return (
		<div>
			<Card
				style={{
					width: "25 rem",
					backgroundColor: "white",
					color: "Black",
					boxShadow: "1px",
					border: "solid",
				}}
				className="profileCard"
			>
				<Card.Img
					variant="top"
					src={currentUser.photoURL}
					style={{ borderRadius: "45%" }}
				/>
				<Card.Body>
					<Card.Title>{currentUser.displayName}</Card.Title>
					<Card.Text>
						{currentProfile ? (
							<span>Followers:{currentProfile.followers.length}</span>
						) : null}
					</Card.Text>
				</Card.Body>
			</Card>
			<Input></Input>
			<h2 style={{ color: "white", paddingLeft: "10px" }}>Posts</h2>
			<GetUserPosts name={currentUser.displayName}></GetUserPosts>
		</div>
	);
};
