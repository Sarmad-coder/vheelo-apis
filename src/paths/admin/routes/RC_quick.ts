import express, { Request, Response, NextFunction } from "express";
import { create, findAll, findById, findByQuery,deleteById,updateById } from "../controllers/RC_quick";
import { validateInputs } from "../../../middlewares/validate";
const router = express.Router();


router.post("/add", validateInputs(["name", "logo", "priceKm","type"]), create);

router.get("/getAll", findAll);
router.get("/getByQuery", findByQuery);
router.get("/getById/:id", findById);
router.put("/updateById/:id", updateById);
router.delete("/deleteById/:id", deleteById);

export default router;
