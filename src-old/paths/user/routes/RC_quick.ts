import express, { Request, Response, NextFunction } from "express";
import { findAll, findById, findByQuery } from "../controllers/RC_quick";
import { validateInputs } from "../../../middlewares/validate";
const router = express.Router();



router.get("/getAll", findAll);
router.get("/getByQuery", findByQuery);
router.get("/getById/:id", findById);

export default router;
