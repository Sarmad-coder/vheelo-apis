import express, { Request, Response, NextFunction } from "express";
import { validateInputs } from "../../../middlewares/validate"
import { create,getByRider } from "../controllers/walletRider";
const router = express.Router();


router.post("/add", create);
router.get("/getByRider/:rider", getByRider);


export default router;
