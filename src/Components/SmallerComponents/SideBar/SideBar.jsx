import { ButtonGroup, Dropdown, DropdownButton, Button } from "react-bootstrap";

export const SideBar = () => {
	return (
		<div
			class="btn-group-vertical"
			style={{ width: "20vw", height: "400px", paddingTop: "10px	" }}
		>
			<button
				type="button"
				class="btn btn-primary"
				style={{ marginLeft: "15px" }}
			>
				Friends
			</button>
			<button type="button" class="btn btn-secondary">
				Groups
			</button>
			<button type="button" class="btn btn-success">
				News
			</button>
			<button type="button" class="btn btn-danger">
				Videos
			</button>
			<button type="button" class="btn btn-warning">
				Music
			</button>
			<button type="button" class="btn btn-info">
				Info
			</button>
			<button type="button" class="btn btn-light">
				Settings
			</button>
			<button type="button" class="btn btn-dark">
				About
			</button>
		</div>
	);
};
