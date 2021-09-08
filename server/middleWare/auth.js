import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
	try {
		// get token from cookies
		const token = req.cookies.mernauth;
		if (!token) return res.status(401).json({ errMessage: "Unauthorized." });

		// compare and verify token with secret password
		const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
		if (!verifyToken)
			return res.status(401).json({ errMessage: "Unauthorized!" });
		// associate token to user creator
		// req.user = verifyToken.user;

		console.log(verifyToken);

		next();
	} catch (error) {
		console.log(error.message);
	}
};

export default auth;
