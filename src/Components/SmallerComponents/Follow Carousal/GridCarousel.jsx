import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { collection, getDocs } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { query } from "firebase/firestore";
import { onSnapshot } from "firebase/firestore";
import { doc, setDoc, updateDoc, orderBy } from "firebase/firestore";
import { db } from "../../firebase/firebase_init";
import { CurrentUserState } from "../../States/CurrentUserState";
import { Card, Button } from "react-bootstrap";
import "./GridCarousel.css";

export const GridCarousel = () => {
	//////////Follow Mechanism//////////////
	const [people, setPeople] = useState([]);
	const [currentUser] = useContext(CurrentUserState);
	const [followCounter, setFollowCounter] = useState(false);

	///////////Getting All Users////////
	useEffect(() => {
		const q = query(collection(db, "Users"));
		const posts = [];
		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			querySnapshot.forEach((doc) => {
				posts.push(doc.data());
			});
			setPeople(posts);
		});
		return unsubscribe;
	}, [people]);

	const onFollowClick = async (curr) => {
		// console.log(currentUser.email);
		// console.log(curr.followers, curr.email);

		////Checking for already following////////////

		if (curr.followers.includes(currentUser.email)) {
			return;
		} else {
			const newFollowers = curr.followers;
			// console.log(newFollowers);
			if (newFollowers.length < 1) {
				newFollowers.push(currentUser.email);
				const cityRef = doc(db, "Users", curr.email);
				updateDoc(cityRef, { followers: newFollowers });
			} else {
				if (!newFollowers.includes(currentUser.email)) {
					newFollowers.push(currentUser.email);
					const cityRef = doc(db, "Users", curr.email);
					updateDoc(cityRef, { followers: newFollowers });
				}
			}
		}
	};

	//////UnfollowMechanism/////////
	const unfollowClick = async (curr) => {
		const newFollowers = curr.followers.filter(
			(cur) => cur != currentUser.email
		);
		const cityRef = doc(db, "Users", curr.email);
		updateDoc(cityRef, { followers: newFollowers });
	};

	////////////Responsive styling for the carousel///////
	const responsive = {
		desktop: {
			breakpoint: { max: 3000, min: 1024 },
			items: 2,
			slidesToSlide: 2, // optional, default to 1.
		},
		tablet: {
			breakpoint: { max: 1024, min: 464 },
			items: 2,
			slidesToSlide: 2, // optional, default to 1.
		},
		mobile: {
			breakpoint: { max: 464, min: 0 },
			items: 2,
			slidesToSlide: 2, // optional, default to 1.
		},
	};
	return (
		<div style={{ marginTop: "50px" }}>
			<h2 style={{ textAlign: "center" }}>Find New People</h2>
			{/* https://www.npmjs.com/package/react-multi-carousel */}
			<Carousel
				responsive={responsive}
				// containerClass="carousel-container"
				// itemClass="carousel-item"
			>
				{people.map((curr, index) => {
					return (
						<div key={index} className="FollowList">
							<img
								src={curr.photoURL}
								style={{ borderRadius: "45%", paddingTop: "2px" }}
							></img>
							<h3>{curr.name}</h3>
							<h4 style={{ paddingBottom: "5px" }}>
								Followers:{curr.followers.length}
							</h4>
							{curr.followers.includes(currentUser.email) ? (
								<Button
									onClick={() => {
										unfollowClick(curr);
									}}
									style={{
										marginTop: "-12px",
										marginBottom: "3px",
										backgroundColor: "red",
									}}
								>
									UnFollow
								</Button>
							) : (
								<Button
									onClick={() => {
										onFollowClick(curr);
									}}
									style={{ marginTop: "-12px", marginBottom: "3px" }}
								>
									Follow
								</Button>
							)}
						</div>
					);
				})}
			</Carousel>
			{/* Repeat */}
			{/* https://www.npmjs.com/package/react-multi-carousel */}
			<div style={{ paddingTop: "10px" }}>
				<Carousel
					responsive={responsive}
					// containerClass="carousel-container"
					// itemClass="carousel-item"
				>
					{people.map((curr, index) => {
						return (
							<div key={index} className="FollowList">
								<img
									src={curr.photoURL}
									style={{ borderRadius: "45%", paddingTop: "2px" }}
								></img>
								<h3>{curr.name}</h3>
								<h4 style={{ paddingBottom: "5px" }}>
									Followers:{curr.followers.length}
								</h4>
								{curr.followers.includes(currentUser.email) ? (
									<Button
										onClick={() => {
											unfollowClick(curr);
										}}
										style={{
											marginTop: "-12px",
											marginBottom: "3px",
											backgroundColor: "red",
										}}
									>
										UnFollow
									</Button>
								) : (
									<Button
										onClick={() => {
											onFollowClick(curr);
										}}
										style={{ marginTop: "-12px", marginBottom: "3px" }}
									>
										Follow
									</Button>
								)}
							</div>
						);
					})}
				</Carousel>
			</div>
		</div>
	);
};
