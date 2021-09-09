import React, { useState } from "react";
import axios from "axios";

function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	async function login(e) {
		e.preventDefault();

		try {
			const loginUser = {
				email,
				password
			};

			await axios.post("http://localhost:5000/user/signup", loginUser);
		} catch (error) {
			console.error(error);
		}
	}
	return (
		<div>
			<h1>Login page!</h1>
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
