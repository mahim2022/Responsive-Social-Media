import logo from "./logo.svg";
import "./App.css";
import SignInPage from "./Components/Pages/SignInPage/SignInPage";
import { CurrentUserState } from "./Components/States/CurrentUserState.jsx";
import { useContext } from "react";
import { Input } from "./Components/SmallerComponents/PostInput/Input.jsx";
import { GetPosts } from "./Components/SmallerComponents/Posts/GetPosts";
import { NavBar } from "./Components/NavigationMenu/NavBootStrap";
import { Routes, Route, Link } from "react-router-dom";
import { Homepage } from "./Components/Pages/Homepage/Homepage";
import { ProfilePage } from "./Components/Pages/ProfilePage/ProfilePage";
import { WorldChat } from "./Components/Pages/WorldChat/WorldChat";
import { DirectChatPage } from "./Components/Pages/ChatEngine.io/ChatEngine";
import { GridCarousel } from "./Components/SmallerComponents/Follow Carousal/GridCarousel";

function App() {
	const [currentUser] = useContext(CurrentUserState);

	if (!currentUser)
		return (
			<div
				className="App"
				style={{ background: "black", height: "100vh", width: "100vw" }}
			>
				<SignInPage></SignInPage>
			</div>
		);
	else
		return (
			<div className="App">
				<NavBar></NavBar>
				<Routes>
					<Route path="/" element={<Homepage />} />
					<Route path="/Profile/" element={<ProfilePage />} />
					<Route path="/follow" element={<GridCarousel />} />
					<Route path="/worldChat" element={<WorldChat />} />
					<Route path="/chatengine" element={<DirectChatPage />} />
				</Routes>
			</div>
		);
}

export default App;
