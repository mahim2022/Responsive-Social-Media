import { collection, limit } from "firebase/firestore";
import React, { useEffect, useState, useRef } from "react";
import { query, orderBy } from "firebase/firestore";
import { getDocs } from "firebase/firestore";
import { onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase/firebase_init";
import ScrollableFeed from "react-scrollable-feed";
import "./GetChat.css";

export const GetChats = () => {
	const [messages, setMessages] = useState([]);

	useEffect(() => {
		const q = query(collection(db, "WorldChat"), orderBy("createdAt", "asc"));

		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			const array = [];
			querySnapshot.forEach((doc) => {
				array.push(doc.data());
			});

			setMessages(array);
		});
		return unsubscribe;
	}, []);
	///////////Scroll to bottom//////////////
	const divRef = useRef(null);
	useEffect(() => {
		divRef.current.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	return (
		<div className="getMessages">
			<ScrollableFeed forceScroll={true}>
				{messages.map((curr, index) => {
					return (
						<div key={index} className="messageBody">
							<div className="imgAndName">
								<img src={curr.photoURL} className="profileImg"></img>
								<h4>{curr.displayName}</h4>
							</div>
							<span>{curr.message}</span>
						</div>
					);
				})}
				{/* Scroll to bottom div */}
				<div ref={divRef} />
			</ScrollableFeed>
		</div>
	);
};
