import { SideBar } from "../../SmallerComponents/SideBar/SideBar";
import "./PCHomepage.css";
import { Input } from "../../SmallerComponents/PostInput/Input";
import { GetPosts } from "../../SmallerComponents/Posts/GetPosts";
import { GridCarousel } from "../../SmallerComponents/Follow Carousal/GridCarousel";

export const PCHomepage = () => {
	return (
		<div className="homepageComponents">
			<div className="sideBar">
				<SideBar></SideBar>
			</div>

			<div className="posts">
				<Input></Input>
				<h2 style={{ paddingBottom: "10px", marginLeft: "15px" }}>
					Recent Posts
				</h2>
				<GetPosts></GetPosts>
			</div>
			<div style={{ width: "30vw", border: "solid", borderWidth: "0px" }}>
				<GridCarousel></GridCarousel>
			</div>
		</div>
	);
};
