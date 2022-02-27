import { useContext } from "react";
import { Container, Nav, NavDropdown } from "react-bootstrap";
import { Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { CurrentUserState } from "../States/CurrentUserState";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import logo from "../logos/logo.png";

export const NavBar = () => {
	const [currentUser, setCurrentUser] = useContext(CurrentUserState);

	const navigate = useNavigate();

	const logout = () => {
		navigate("/");
		const auth = getAuth();
		signOut(auth)
			.then(() => {
				// Sign-out successful.
				console.log(`signoutsuccesssful`);
				setCurrentUser(null);
			})
			.catch((error) => {
				// An error happened.
				console.log(error);
			});
	};

	return (
		<Navbar
			collapseOnSelect
			expand="lg"
			bg="dark"
			variant="dark"
			style={{
				width: "100vw",
			}}
			sticky="top"
			style={{ borderRadius: "5px", width: "100vw" }}
		>
			<Container>
				<Navbar.Brand as={Link} to="/">
					HOME
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav">
					<Nav className="me-auto">
						<Nav.Link as={Link} to="/Profile/">
							Profile
						</Nav.Link>
						<Nav.Link as={Link} to="/worldchat">
							World Chat
						</Nav.Link>
						<Nav.Link as={Link} to="/follow">
							Find New People
						</Nav.Link>
						<Nav.Link as={Link} to="/chatengine">
							ChatEngine
						</Nav.Link>
						{/* <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
							<NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
							<NavDropdown.Item href="#action/3.2">
								Another action
							</NavDropdown.Item>
							<NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
							<NavDropdown.Divider />
							<NavDropdown.Item href="#action/3.4">
								Separated link
							</NavDropdown.Item>
						</NavDropdown> */}
					</Nav>
					<Nav>
						<Nav.Link onClick={logout}>SignOut</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};
