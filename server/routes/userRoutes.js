import express from "express";
import { signUp, login, logout, loggedIn } from "../controllers/users.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);
router.get("/logout", logout);
router.get("/loggedIn", loggedIn);

export default router;
