import express, { Request, Response, NextFunction } from "express";
import { validateInputs } from "../../../middlewares/validate"
import { create, findAll, findById, findByQuery,deleteById } from "../controllers/vehicleModel";
const router = express.Router();


router.post("/add", validateInputs(["brand", "model"]), create);

router.get("/getAll", findAll);
router.get("/getByQuery", findByQuery);
router.get("/getById/:id", findById);
router.delete("/deleteById/:id", deleteById);

export default router;
