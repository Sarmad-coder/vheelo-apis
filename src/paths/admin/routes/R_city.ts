import express, { Request, Response, NextFunction } from "express";
import { validateInputs } from "../../../middlewares/validate"
import { findCompleted,findCancelled,deleteById } from "../controllers/R_City";
const router = express.Router();


router.get("/getCancelled", findCancelled);
router.get("/getCompleted", findCompleted);
router.delete("/deleteById/:id", deleteById);

export default router;
