import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import AuthContext from "../../context/AuthContext";

function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const history = useHistory();
	const { getLoggedIn } = useContext(AuthContext);

	async function login(e) {
		e.preventDefault();

		try {
			const loginUser = {
				email,
				password
			};

			await axios.post("http://localhost:5000/user/login", loginUser);
			await getLoggedIn();
			history.push("/");
		} catch (error) {
			console.error(error);
		}
	}
	return (
		<div>
			<h1>Login With Your Account!</h1>
			<form onSubmit={login}>
				<input
					type='email'
					placeholder='Email'
					onChange={e => setEmail(e.target.value)}
					value={email}
				/>
				<input
					type='password'
					placeholder='Password'
					onChange={e => setPassword(e.target.value)}
					value={password}
				/>
				<button type='submit'>Log in</button>
			</form>
		</div>
	);
}

export default Login;
