import express, { Request, Response, NextFunction } from "express";
import { validateInputs } from "../../../middlewares/validate"
import { findAll, findById, findByQuery } from "../controllers/vehicleModel";
const router = express.Router();



router.get("/getAll", findAll);
router.get("/getByQuery", findByQuery);
router.get("/getById/:id", findById);

export default router;
