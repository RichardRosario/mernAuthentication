import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
	return (
		<>
			<Link to='/'>Home</Link>
			<Link to='/register'>Register</Link>
			<Link to='/login'>Log in</Link>
			<Link to='/customers'>Customers</Link>
		</>
	);
};

export default Navbar;
