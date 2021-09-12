import React, { useState, createContext, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

function AuthContextProvider(props) {
	const [loggedIn, setLoggedIn] = useState(undefined);

	const getLoggedIn = async () => {
		const loggedInResponse = await axios.get(
			"http://localhost:5000/user/loggedIn"
		);
		setLoggedIn(loggedInResponse.data);
	};

	useEffect(() => {
		getLoggedIn();
	}, []);

	return (
		<AuthContext.Provider value={{ loggedIn, getLoggedIn }}>
			{props.children}
		</AuthContext.Provider>
	);
}
export default AuthContext;
export { AuthContextProvider };
