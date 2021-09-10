import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import AuthContext from "../../context/AuthContext";

function Register() {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [passwordVerify, setPasswordVerify] = useState("");

	const { getLoggedIn } = useContext(AuthContext);
	const history = useHistory();

	async function register(e) {
		e.preventDefault();

		try {
			const registerUser = {
				firstName,
				lastName,
				email,
				password,
				passwordVerify
			};

			await axios.post("http://localhost:5000/user/signup", registerUser);
			await getLoggedIn();
			history.push("/");
		} catch (error) {
			console.error(error);
		}
	}
	return (
		<div>
			<h1>Register An Account!</h1>
			<form onSubmit={register}>
				<input
					type='text'
					placeholder='First Name'
					onChange={e => setFirstName(e.target.value)}
					value={firstName}
				/>
				<input
					type='text'
					placeholder='Last Name'
					onChange={e => setLastName(e.target.value)}
					value={lastName}
				/>
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
				<input
					type='password'
					placeholder='Verify your password'
					onChange={e => setPasswordVerify(e.target.value)}
					value={passwordVerify}
				/>
				<button type='submit'>Submit</button>
			</form>
		</div>
	);
}

export default Register;
