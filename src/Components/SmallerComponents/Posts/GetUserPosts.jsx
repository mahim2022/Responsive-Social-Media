import { collection, limit } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { query, orderBy } from "firebase/firestore";
import { getDocs } from "firebase/firestore";
import { onSnapshot, where } from "firebase/firestore";
import { db } from "../../firebase/firebase_init";
import "./GetPosts.css";

export const GetUserPosts = (name) => {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		const q = query(
			collection(db, "Posts"),
			where("displayName", "==", `${name.name}`),
			orderBy("createdAt", "desc")
		);

		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			const posts = [];
			querySnapshot.forEach((doc) => {
				posts.push(doc.data());
			});

			setPosts(posts);
		});
		return unsubscribe;
	}, []);
	// console.log(name.name);

	return (
		<div className="getPosts">
			<ul className="postsUL">
				{posts.map((curr, index) => (
					<li className="post" key={index}>
						<div className="imgNameDiv">
							<img src={curr.photoURL} className="profilePic"></img>
							<h4 className="displayName">{curr.displayName}:</h4>
						</div>
						<span className="innerText">{curr.post}</span>
					</li>
				))}
			</ul>
		</div>
	);
};
