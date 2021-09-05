import express from "express";

import User from "../models/userModel.js";

const router = express.Router();

router.post("/", async (req, res) => {
	try {
		const { email, password, passwordVerify } = req.body;

		// validate fields
		if (!email || !password || !passwordVerify) {
			return res.status(400).send({ errMsg: "All fields must be filled!" });
		}
		if (password.length < 6) {
			return res
				.status(400)
				.send({ errMsg: "Password must be at least 6 characters." });
		}
		if (password !== passwordVerify) {
			return res
				.status(400)
				.send({ errMsg: "Please enter same password twice." });
		}

		// check if an email exist in database
		const existingEmail = await User.findOne({ email: email });
		if (existingEmail) {
			return res.status(400).send({ errMsg: "That email is already in use!" });
		}
	} catch (error) {
		console.error(error);
		res.status(500).send();
	}
});

export default router;
