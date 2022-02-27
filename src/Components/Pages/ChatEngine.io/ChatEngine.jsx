import React, { useEffect, useState } from "react";
import { ChatEngine, getOrCreateChat } from "react-chat-engine";
import "./ChatEngine.css";
import { useContext } from "react";
import { CurrentUserState } from "../../States/CurrentUserState";
import axios, { Axios } from "axios";

/////https://www.youtube.com/watch?v=Bv9Js3QLOLY  (chatengine.io)//////////

export const DirectChatPage = () => {
	const [currentUser] = useContext(CurrentUserState);
	const [username, setUsername] = useState("");
	const [loading, setLoading] = useState(true);

	const authObject = { "PRIVATE-KEY": "61ebd382-619a-4e1f-9721-1944ca0b91cd" };

	////////GetUserImageFile//////
	const getFile = async (url) => {
		const res = await fetch(url);
		const data = await res.blob();

		return new File([data], "userPhoto.jpg", { type: "image/jpeg" });
	};

	//////////API Call/////////////

	useEffect(async () => {
		// console.log(currentUser);
		///////Authenticating Existing User////////////

		// prettier-ignore
		axios
			.get("https://api.chatengine.io/users/me", {
				'headers': {
					'userName': currentUser.email,
					'userSecret': currentUser.uid,
					'projectID': "bcb5e18e-fab0-46b0-8272-4da89165f0fb",
				},
			})
			.then(console.log(`authenticated`))
			.catch(() => {
				///////If not authenticated create new user//////
				const formdata = new FormData();
				formdata.append("username", currentUser.email);
                formdata.append("secret", currentUser.uid);
                // console.log(formdata.get('userName'));
				/////

                ///Adding photo to formdata//

				getFile(currentUser.photoURL).then((avatar) => {
                    formdata.append("avatar", avatar, avatar.name);				
                });
                
                /////posting new user//////
				// prettier-ignore
                axios.post(
                "https://api.chatengine.io/users/",
                formdata,
                {
                    'headers': authObject,
                }
            )
            .then(() => {
                console.log(`Created new user succesfully`);
            })
            .catch(() => console.log(`~Couldnt create New User`));
            });
	}, [currentUser]);

	////////////DirectChat1on1///////////

	function createDirectChat(creds) {
		getOrCreateChat(
			creds,
			{ is_direct_chat: true, usernames: [username] },
			() => setUsername("")
		);
	}

	return (
		<div
			style={{
				fontFamily: "Avenir",
				position: "absolute",
				zIndex: "9999",
				marginTop: "10px",
				width: "100vw",
			}}
			className="chatEngine"
		>
			<ChatEngine
				height="100vh"
				userName={currentUser.email}
				userSecret={currentUser.uid}
				projectID="bcb5e18e-fab0-46b0-8272-4da89165f0fb            "
			/>
		</div>
	);
};
