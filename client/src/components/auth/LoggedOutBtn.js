import React, { useContext } from "react";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import { useHistory } from "react-router-dom";

function LoggedOutBtn() {
	const history = useHistory();
	const { getLoggedIn } = useContext(AuthContext);
	async function logout() {
		await axios.get("http://localhost:5000/user/logout");
		await getLoggedIn();
		history.push("/login");
	}
	return <button onClick={logout}>Log Out</button>;
}

export default LoggedOutBtn;
