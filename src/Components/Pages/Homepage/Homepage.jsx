import { FollowCarousel } from "../../SmallerComponents/Follow Carousal/FollowCarousol";
import { Input } from "../../SmallerComponents/PostInput/Input";
import { GetPosts } from "../../SmallerComponents/Posts/GetPosts";
import { PCHomepage } from "../MobileHomepage/PCHomepage";

export const Homepage = () => {
	// The current width of the viewport
	const width = window.innerWidth;
	// The width below which the mobile view should be rendered
	const breakpoint = 620;

	return width < breakpoint ? (
		<div>
			<Input></Input>
			<h2 style={{ marginLeft: "20px", marginBottom: "10px" }}>Recent Posts</h2>
			<GetPosts></GetPosts>
		</div>
	) : (
		<PCHomepage></PCHomepage>
	);

	// return (
	// 	<div>
	// 		<Input></Input>
	// 		<h2 style={{ marginLeft: "20px", marginBottom: "10px" }}>Recent Posts</h2>
	// 		<GetPosts></GetPosts>
	// 	</div>
	// );
};
