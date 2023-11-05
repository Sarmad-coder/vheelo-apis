import express, { Request, Response, NextFunction } from "express";
import { findPending } from "../controllers/R_quick";
import { validateInputs } from "../../../middlewares/validate";
const router = express.Router();



router.get("/getPending", findPending)

export default router;
