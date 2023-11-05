import express from "express";

const router = express.Router();
import { validateInputs } from "../../../middlewares/validate"
import { getById } from "../controllers/R_quick"

router.post("/getById", validateInputs(["rideId"]), getById);




export default router;
