import express, { Request, Response, NextFunction } from "express";
import { create, findAll, findById, findByQuery } from "../controllers/RC_quick";
import { validateInputs } from "../../../middlewares/validate";
const router = express.Router();


router.post("/add", validateInputs(["name", "logo", "priceKm"]), create);

router.get("/getAll", findAll);
router.get("/getByQuery", findByQuery);
router.get("/getById/:id", findById);

export default router;
