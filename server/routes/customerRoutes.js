import express from "express";

import { createCustomer, getCustomers } from "../controllers/customers.js";
import auth from "../middleWare/auth.js";

const router = express.Router();

router.post("/", auth, createCustomer);
router.get("/", auth, getCustomers);

export default router;
