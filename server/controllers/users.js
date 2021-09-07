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

		res.status(200).send(createdUser);
	} catch (error) {
		console.log(error.message);
	}
};
