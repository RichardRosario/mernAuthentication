import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import userRoute from "./routes/userRoutes.js";
import customerRoute from "./routes/customerRoutes.js";

dotenv.config();

const app = express();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

app.use(cors());

// use cookie-parser to parse all incoming cookies
app.use(cookieParser());

// routes
app.use("/user", userRoute);
app.use("/customer", customerRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running at port ${PORT}`));

mongoose.connect(
	process.env.DB_URL,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true
	},
	err => {
		if (err) return console.error(err);
		console.log("Connected to MongoDB");
	}
);
