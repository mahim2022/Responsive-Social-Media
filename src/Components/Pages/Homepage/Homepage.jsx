import { useEffect, useState } from "react";
import { Input } from "../../SmallerComponents/PostInput/Input";
import { GetPosts } from "../../SmallerComponents/Posts/GetPosts";
import { PCHomepage } from "../MobileHomepage/PCHomepage";

export const Homepage = () => {
	const [width, setWidth] = useState(window.innerWidth);
	const breakpoint = 620;

	useEffect(() => {
		const handleWindowResize = () => setWidth(window.innerWidth);
		window.addEventListener("resize", handleWindowResize);

		// Return a function from the effect that removes the event listener
		return () => window.removeEventListener("resize", handleWindowResize);
	}, []);

	return width < breakpoint ? (
		<div>
			<Input></Input>
			<h2 style={{ marginLeft: "20px", marginBottom: "10px" }}>Recent Posts</h2>
			<GetPosts></GetPosts>
		</div>
	) : (
		<PCHomepage></PCHomepage>
	);
};
