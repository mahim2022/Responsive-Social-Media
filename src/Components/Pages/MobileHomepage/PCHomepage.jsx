import { FollowCarousel } from "../../SmallerComponents/Follow Carousal/FollowCarousol";
import { SideBar } from "../../SmallerComponents/SideBar/SideBar";
import { Homepage } from "../Homepage/Homepage";
import "./PCHomepage.css";
import { Input } from "../../SmallerComponents/PostInput/Input";
import { GetPosts } from "../../SmallerComponents/Posts/GetPosts";

export const PCHomepage = () => {
	return (
		<div className="homepageComponents">
			<SideBar></SideBar>
			<div style={{ width: "70vw", marginRight: "90px", paddingLeft: "12px" }}>
				<Input></Input>
				<h2 style={{ paddingBottom: "10px", marginLeft: "15px" }}>
					Recent Posts
				</h2>
				<GetPosts></GetPosts>
			</div>
		</div>
	);
};
