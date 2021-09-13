import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";

dotenv.config();

const app = express();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(
	cors({
		origin: "http://localhost:3000",
		credentials: true
	})
);

app.use(cookieParser());

// app.use("/test", testRoute);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

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
