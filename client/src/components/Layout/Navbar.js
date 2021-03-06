import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import LoggedOutBtn from "../auth/LoggedOutBtn";

const Navbar = () => {
	const { loggedIn } = useContext(AuthContext);
	console.log(loggedIn);

	return (
		<>
			<Link to='/'>Home</Link>
			{loggedIn === false && (
				<>
					<Link to='/register'>Register</Link>
					<Link to='/login'>Log in</Link>
				</>
			)}
			{loggedIn === true && (
				<>
					<Link to='/customers'>Customers</Link>
					<Link to='/posts'>Posts</Link>

					<LoggedOutBtn />
				</>
			)}
		</>
	);
};

export default Navbar;
