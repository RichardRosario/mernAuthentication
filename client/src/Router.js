import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./components/Layout/Navbar";
import Register from "./components/auth/Register";

const Router = () => {
	return (
		<>
			<BrowserRouter>
				<Navbar />
				<Switch>
					<Route exact path='/'>
						<div>Home</div>
					</Route>
					<Route path='/register'>
						<Register />
					</Route>
					<Route path='/login'>
						<div>Log in</div>
					</Route>
					<Route path='/customers'>
						<div>Customers</div>
					</Route>
				</Switch>
			</BrowserRouter>
		</>
	);
};

export default Router;
