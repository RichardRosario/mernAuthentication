import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signUp = async (req, res) => {
	const {
		firstName,
		lastName,
		email,
		contact,
		password,
		passwordVerify
	} = req.body;

	try {
		if (!firstName || !lastName || !email || !password || !passwordVerify)
			return res
				.status(400)
				.json({ errMassage: "Required fields must not be empty." });

		if (password < 6)
			return res
				.status(400)
				.json({ errMassage: "Enter at least 6 characters." });
		if (password !== passwordVerify)
			return res.status(400).json({ errMassage: "Enter same password twice." });

		// checking to see if email exist
		const existingEmail = await User.findOne({ email: email });
		if (existingEmail)
			return res
				.status(400)
				.json({ errMassage: "That email is already in our database!" });

		// hash the password using bcrypt
		const salt = bcrypt.genSaltSync(10);
		const passwordHash = await bcrypt.hash(password, salt);
		// create new user model
		const newUser = new User({
			firstName,
			lastName,
			email,
			contact,
			passwordHash
		});

		const createdUser = await newUser.save();

		// log user automatically after signup
		const token = jwt.sign(
			{
				user: createdUser._id
			},
			process.env.JWT_SECRET,
			{ expiresIn: "1h" }
		);

		//send token to http only cookie
		res
			.cookie("mernauth", token, {
				httpOnly: true
			})
			.send();

		return res.status(200).send(createdUser);
	} catch (error) {
		console.log(error.message);
	}
};

export const login = async (req, res) => {
	const { email, password } = req.body;

	try {
		if (!email || !password)
			return res.status(401).json({ errMassage: "all fields are required!" });

		const existingUser = await User.findOne({ email: email });
		if (!existingUser)
			return res
				.status(401)
				.json({ errMassage: "Email or password is incorrect." });

		const correctPassword = bcrypt.compare(password, existingUser.passwordHash);

		if (!correctPassword)
			return res
				.status(401)
				.json({ errMassage: "Email or password is incorrect!" });

		// log the user
		const token = jwt.sign(
			{
				user: existingUser._id
			},
			process.env.JWT_SECRET,
			{ expiresIn: "1h" }
		);

		//send token to http only cookie
		res
			.cookie("mernauth", token, {
				httpOnly: true
			})
			.send();
	} catch (error) {
		console.log(error.message);
	}
};

export const logout = (req, res) => {
	// set token to empty string and set date to the past
	res.cookie("mernauth", "", { httpOnly: true, expires: new Date(0) }).send();
};

export const loggedIn = (req, res) => {
	try {
		// get token from cookies
		const token = req.cookies.mernauth;
		if (!token) return res.json(false);

		// compare and verify token with secret password
		jwt.verify(token, process.env.JWT_SECRET);
		res.json(true);
	} catch (error) {
		res.json(false);
	}
};
