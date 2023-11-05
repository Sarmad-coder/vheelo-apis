import express from "express";
const router = express.Router();

import { findAll } from "../controllers/user"

router.get("/", findAll);




export default router;
