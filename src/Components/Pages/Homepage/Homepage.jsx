import { FollowCarousel } from "../../SmallerComponents/Follow Carousal/FollowCarousol";
import { Input } from "../../SmallerComponents/PostInput/Input";
import { GetPosts } from "../../SmallerComponents/Posts/GetPosts";

export const Homepage = () => {
	return (
		<div>
			<Input></Input>
			<h2 style={{ marginLeft: "20px", marginBottom: "10px" }}>Recent Posts</h2>
			<GetPosts></GetPosts>
		</div>
	);
};
