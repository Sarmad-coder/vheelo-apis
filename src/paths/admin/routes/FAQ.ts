import express, { Request, Response, NextFunction } from "express";
import { validateInputs } from "../../../middlewares/validate"
import { create,getById,getAll,deleteFAQ,updateById } from "../controllers/FAQ";
const router = express.Router();


router.post("/add", create);
router.post("/updateById", updateById);
router.get("/getAll", getAll);
router.get("/getById/:id", getById);
router.delete("/delete/:id", deleteFAQ);

export default router;
