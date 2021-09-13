import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import { useForm } from "react-hook-form";

function Login() {
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm();
	const history = useHistory();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { getLoggedIn } = useContext(AuthContext);

	async function login(e) {
		// e.preventDefault();

		try {
			const loginUser = {
				email,
				password
			};

			await axios.post("http://localhost:5000/users/login", loginUser);
			await getLoggedIn();
			history.push("/");
		} catch (error) {
			console.log(error);
		}
	}
	return (
		<div>
			<h1>Login With Your Account!</h1>
			<form onSubmit={handleSubmit(login)}>
				<input
					type='email'
					{...register("email", { required: true })}
					placeholder='Email'
					onChange={e => setEmail(e.target.value)}
					value={email}
				/>
				{errors.email && <span>an email is required</span>}
				<input
					type='password'
					{...register("password", { required: true, minLength: 6 })}
					placeholder='Password'
					onChange={e => setPassword(e.target.value)}
					value={password}
				/>
				{errors.password && <span>Password is required</span>}
				<button type='submit'>Log in</button>
			</form>
		</div>
	);
}

export default Login;
